import UserModel from "../models/user.model.js";
import StudentModel from "../models/student.model.js";
import LabModel from '../models/lab.model.js';
import AssignmentModel from "../models/assignment.model.js";

const studentController = {
    // Register Student Profile
    registerStudent: async (req, res) => {
        try {
            const { rollNumber, batch, branch } = req.body;
            if (!req.file || !req.file.path) {
                return res.status(400).json({ message: 'Profile image is required' });
            }

            // Check if the profile already exists
            let existingStudent = await StudentModel.findOne({ userId: req.user._id });
            if (existingStudent) {
                return res.status(400).json({ message: 'Profile already exists' });
            }

            // Create the student profile
            const student = await StudentModel.create({
                userId: req.user._id,
                profileImage: req.file.path, // Cloudinary URL
                rollNumber,
                batch,
                branch
            });

            // Update the User to reference this student profile
            await UserModel.findByIdAndUpdate(
                req.user._id,
                { studentId: student._id },
                { new: true }
            );

            res.status(201).json({
                success: true,
                message: 'Student profile created successfully',
                data: student
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProfile: async (req, res) => {
        try {
            console.log(req.user._id);
            const student = await UserModel.findById(req.user._id)
                .populate('studentId');

            console.log("Student profile: ", student);
            if (!student) return res.status(404).json({ message: 'Student not found' });
            res.status(200).json({ success: true, message: "Profile fetched successfully", data: student });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { rollNumber, batch, branch, name, collegeName } = req.body;
            //email can't be changed

            // 2Build update data for Student
            const studentUpdateData = { rollNumber, batch, branch };
            if (req.file && req.file.path) {
                studentUpdateData.profileImage = req.file.path; // Cloudinary URL
            }

            // Update student-specific fields
            const student = await StudentModel.findOneAndUpdate(
                { userId: req.user._id },
                studentUpdateData,
                { new: true, runValidators: true }
            );

            if (!student) {
                return res.status(404).json({ message: 'Student profile not found' });
            }

            // 4Update user fields
            const user = await UserModel.findByIdAndUpdate(
                req.user._id,
                { name, collegeName },
                { new: true, runValidators: true }
            );

            // 5️⃣ Return merged profile data
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: { ...user.toObject(), studentProfile: student }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    joinLab: async (req, res) => {
        try {
            const { joinCode } = req.body;
            const labId = req.params.id;
            const studentId = req.user._id;

            // Find lab by id
            const lab = await LabModel.findById(labId);
            if (!lab) {
                return res.status(404).json({ message: 'Lab not found' });
            }

            // Check join code
            if (lab.joinCode !== joinCode) {
                return res.status(400).json({ message: 'Invalid join code' });
            }

            // Check if student already joined
            if (lab.students.includes(studentId)) {
                return res.status(400).json({ message: 'You have already joined this lab' });
            }

            // Add student to lab
            lab.students.push(studentId);
            await lab.save();

            // Add lab reference to student model
            await StudentModel.findOneAndUpdate(
                { userId: studentId },
                { $addToSet: { labs: labId } }
            );

            res.status(200).json({ message: 'Successfully joined the lab', lab });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    leaveLab: async (req, res) => {
        try {
            const labId = req.params.id;
            const studentId = req.user.studentId;

            if (!labId) {
                return res.status(400).json({ message: 'Lab ID is required' });
            }

            // Remove student from the lab's "students" array
            await LabModel.findByIdAndUpdate(
                labId,
                { $pull: { students: studentId } },
                { new: true }
            );

            // Remove lab from the student's "labs" array
            await StudentModel.findByIdAndUpdate(
                studentId,
                { $pull: { labs: labId } },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: 'Successfully left the lab'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    getAllLabs: async (req, res) => {
        try {
            const studentId = req.user.studentId;

            if (!studentId) {
                return res.status(400).json({ message: 'Student profile not found' });
            }

            // Fetch student with labs populated
            const student = await StudentModel.findById(studentId)
                .populate('labs') // full lab details
                .lean();

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            res.status(200).json({
                success: true,
                labs: student.labs || []
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get all assigment for a selected lab -by the student
    getAllAssignments: async (req, res) => {
        try {
            const studentId = req.user.studentId;
            const labId = req.params.labId; // Lab ID from URL

            if (!studentId) {
                return res.status(400).json({ message: 'Student profile not found' });
            }

            // Check if the student is part of this lab
            const student = await StudentModel.findById(studentId).lean();
            if (!student.labs.includes(labId)) {
                return res.status(403).json({ message: 'You are not a member of this lab' });
            }

            // Get assignments for the lab
            const assignments = await AssignmentModel.find({ labId }).lean();

            res.status(200).json({
                success: true,
                assignments
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

export default studentController;