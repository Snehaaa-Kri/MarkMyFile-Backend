import FacultyModel from "../models/faculty.model.js";
import UserModel from "../models/user.model.js";

const facultyController = {
    // Register Faculty Profile
    register: async (req, res) => {
        try {
            const { department, designation, phoneNumber } = req.body;

            if (!req.file || !req.file.path) {
                return res.status(400).json({ message: 'Profile image is required' });
            }

            // Check if the faculty profile already exists
            let existingFaculty = await FacultyModel.findOne({ userId: req.user._id });
            if (existingFaculty) {
                return res.status(400).json({ message: 'Profile already exists' });
            }

            // Create the faculty profile
            const faculty = await FacultyModel.create({
                userId: req.user._id,
                profileImage: req.file.path,
                department,
                designation,
                phoneNumber
            });

            // Update the User to reference this faculty profile
            await UserModel.findByIdAndUpdate(
                req.user._id,
                { facultyId: faculty._id },
                { new: true }
            );

            res.status(201).json({
                success: true,
                message: 'Faculty profile created successfully',
                data: faculty
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get Faculty Profile
    getProfile: async (req, res) => {
        try {
            const faculty = await FacultyModel.findOne({ userId: req.user._id })
                .populate("userId", "name email collegeName role");

            if (!faculty) {
                return res.status(404).json({ message: "Faculty profile not found" });
            }

            res.status(200).json({
                success: true,
                message: "Faculty profile fetched successfully",
                data: faculty
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update Faculty Profile
    updateProfile: async (req, res) => {
        try {
            const { department, designation, phoneNumber, name, email } = req.body;

            // Check if email is already taken
            if (email) {
                const existingUser = await UserModel.findOne({
                    email: email.toLowerCase(),
                    _id: { $ne: req.user._id }
                });
                if (existingUser) {
                    return res.status(400).json({ message: "Email already in use" });
                }
            }

            // Update faculty-specific fields
            const facultyUpdates = { department, designation, phoneNumber };
            if (req.file?.path) facultyUpdates.profileImage = req.file.path;

            const faculty = await FacultyModel.findOneAndUpdate(
                { userId: req.user._id },
                facultyUpdates,
                { new: true, runValidators: true }
            );

            if (!faculty) {
                return res.status(404).json({ message: "Faculty profile not found" });
            }

            // Update user fields
            const user = await UserModel.findByIdAndUpdate(
                req.user._id,
                { name, email: email?.toLowerCase() },
                { new: true, runValidators: true }
            );

            res.status(200).json({
                success: true,
                message: "Faculty profile updated successfully",
                data: { ...user.toObject(), facultyProfile: faculty }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete Faculty Profile
    deleteProfile: async (req, res) => {
        try {
            const faculty = await FacultyModel.findOneAndDelete({ userId: req.user._id });

            if (!faculty) {
                return res.status(404).json({ message: "Faculty profile not found" });
            }

            // Also remove reference from User
            await UserModel.findByIdAndUpdate(req.user._id, { facultyId: null });

            res.status(200).json({
                success: true,
                message: "Faculty profile deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default facultyController;