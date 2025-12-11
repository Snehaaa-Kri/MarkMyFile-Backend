import LabModel from "../models/lab.model.js";
import FacultyModel from "../models/faculty.model.js";
import UserModel from "../models/user.model.js";
import crypto from "crypto";

const labController = {
    // Create a new lab - teacher
    createLab: async (req, res) => {
        try {
            const { labName } = req.body;

            if (!labName) {
                return res.status(400).json({ message: "Lab name is required" });
            }

            // Ensure faculty exists
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty) {
                return res.status(403).json({ message: "Only faculty can create labs" });
            }

            // Generate a unique join code
            const joinCode = crypto.randomBytes(3).toString("hex");

            const lab = await LabModel.create({
                labName,
                facultyId: faculty._id,
                joinCode
            });

            res.status(201).json({
                success: true,
                message: "Lab created successfully",
                data: lab
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update lab - teacher
    updateLab: async (req, res) => {
        try {
            const { id } = req.params;
            const { labName } = req.body;

            const lab = await LabModel.findById(id);
            if (!lab) {
                return res.status(404).json({ message: "Lab not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty || lab.facultyId.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to update this lab" });
            }

            lab.labName = labName || lab.labName;
            await lab.save();

            res.status(200).json({
                success: true,
                message: "Lab updated successfully",
                data: lab
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get lab by ID - teacher
    getLabById: async (req, res) => {
        try {
            const { id } = req.params;

            const lab = await LabModel.findById(id).populate("facultyId", "department designation");
            if (!lab) {
                return res.status(404).json({ message: "Lab not found" });
            }

            res.status(200).json({
                success: true,
                data: lab
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all labs - teacher
    getAllLabs: async (req, res) => {
        try {
            const labs = await LabModel.find().populate("facultyId", "department designation");
            res.status(200).json({
                success: true,
                count: labs.length,
                data: labs
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete lab - teacher
    deleteLab: async (req, res) => {
        try {
            const { id } = req.params;

            const lab = await LabModel.findById(id);
            if (!lab) {
                return res.status(404).json({ message: "Lab not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty || lab.facultyId.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to delete this lab" });
            }

            await lab.deleteOne();

            res.status(200).json({
                success: true,
                message: "Lab deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Student joins a lab using joinCode
    joinLab: async (req, res) => {
        try {
            const { joinCode } = req.body;

            if (!joinCode) {
                return res.status(400).json({ message: "Join code is required" });
            }

            const lab = await LabModel.findOne({ joinCode });
            if (!lab) {
                return res.status(404).json({ message: "Invalid join code" });
            }

            const user = await UserModel.findById(req.user._id).populate("studentId");
            if (!user.studentId) {
                return res.status(403).json({ message: "Only students can join labs" });
            }

            // Prevent duplicate joins
            if (user.studentId.labs?.includes(lab._id)) {
                return res.status(400).json({ message: "Already joined this lab" });
            }

            user.studentId.labs.push(lab._id);
            await user.studentId.save();

            res.status(200).json({
                success: true,
                message: "Successfully joined the lab",
                data: lab
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Student leaves a lab
    leaveLab: async (req, res) => {
        try {
            const { labId } = req.body;

            const user = await UserModel.findById(req.user._id).populate("studentId");
            if (!user.studentId) {
                return res.status(403).json({ message: "Only students can leave labs" });
            }

            const index = user.studentId.labs.indexOf(labId);
            if (index === -1) {
                return res.status(400).json({ message: "You are not part of this lab" });
            }

            user.studentId.labs.splice(index, 1);
            await user.studentId.save();

            res.status(200).json({
                success: true,
                message: "Successfully left the lab"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default labController;
