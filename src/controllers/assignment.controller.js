import AssignmentModel from "../models/assignment.model.js";
import LabModel from "../models/lab.model.js";
import FacultyModel from "../models/faculty.model.js";

const assignmentController = {
    // Create an assignment
    createAssignment: async (req, res) => {
        try {
            const { labId, title, description, deadline } = req.body;

            if (!labId || !title || !deadline) {
                return res.status(400).json({ message: "labId, title and deadline are required" });
            }

            // Ensure faculty is logged in
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty) {
                return res.status(403).json({ message: "Only faculty can create assignments" });
            }

            // Validate lab exists and belongs to this faculty
            const lab = await LabModel.findById(labId);
            if (!lab) {
                return res.status(404).json({ message: "Lab not found" });
            }
            if (lab.facultyId.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to add assignments to this lab" });
            }

            const assignment = await AssignmentModel.create({
                labId,
                title,
                description,
                deadline,
                createdBy: faculty._id
            });

            res.status(201).json({
                success: true,
                message: "Assignment created successfully",
                data: assignment
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update assignment
    updateAssignment: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, deadline } = req.body;

            const assignment = await AssignmentModel.findById(id);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty || assignment.createdBy.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to update this assignment" });
            }

            assignment.title = title || assignment.title;
            assignment.description = description || assignment.description;
            assignment.deadline = deadline || assignment.deadline;

            await assignment.save();

            res.status(200).json({
                success: true,
                message: "Assignment updated successfully",
                data: assignment
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get assignment by ID
    getAssignmentById: async (req, res) => {
        try {
            const { id } = req.params;
            const assignment = await AssignmentModel.findById(id)
                .populate("labId", "labName")
                .populate("createdBy", "department designation");

            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }

            res.status(200).json({
                success: true,
                data: assignment
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all assignments (filter by labId)
    getAllAssignments: async (req, res) => {
        try {
            const { labId } = req.query;
            let filter = {};
            if (labId) filter.labId = labId;

            const assignments = await AssignmentModel.find(filter)
                .populate("labId", "labName")
                .populate("createdBy", "department designation");

            res.status(200).json({
                success: true,
                count: assignments.length,
                data: assignments
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete assignment
    deleteAssignment: async (req, res) => {
        try {
            const { id } = req.params;

            const assignment = await AssignmentModel.findById(id);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty || assignment.createdBy.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to delete this assignment" });
            }

            await assignment.deleteOne();

            res.status(200).json({
                success: true,
                message: "Assignment deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default assignmentController;