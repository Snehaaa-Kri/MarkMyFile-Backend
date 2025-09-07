import studentModel from "../models/student.model.js";

const studentController = {
    getProfile: async (req, res) => {
        try {
            const student = await studentModel.findOne({ userId: req.user._id })
                .populate('labs');
            if (!student) return res.status(404).json({ message: 'Student not found' });
            res.status(200).json({ success: true, message: "Profile fetched successfully", data: student });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { rollNumber, batch, branch, name, email } = req.body;

            // Update student-specific fields
            const student = await studentModel.findOneAndUpdate(
                { userId: req.user._id },
                { rollNumber, batch, branch },
                { new: true, runValidators: true }
            );
            if (!student) return res.status(404).json({ message: 'Student not found' });

            // Update User fields
            const user = await userModel.findByIdAndUpdate(
                req.user._id,
                { name, email },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: 'Profile updated', student, user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    joinLab: async (req, res) => {

    },
    leaveLab: async (req, res) => {

    },
    getAllLabs: async (req, res) => {

    },
    getAllAssignments: async (req, res) => {

    },
}

export default studentController;