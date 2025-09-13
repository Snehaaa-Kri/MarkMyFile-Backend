import CollegeModel from "../models/college.model.js";

const collegeController = {
    // Create new college
    createCollege: async (req, res) => {
        try {
            const { name, location, establishedYear } = req.body;

            if (!name || !location || !establishedYear) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const college = await CollegeModel.create({
                name,
                location,
                establishedYear,
            });

            res.status(201).json({
                success: true,
                message: "College created successfully",
                data: college,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update college
    updateCollege: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, location, establishedYear } = req.body;

            const college = await CollegeModel.findByIdAndUpdate(
                id,
                { name, location, establishedYear },
                { new: true, runValidators: true }
            );

            if (!college) {
                return res.status(404).json({ message: "College not found" });
            }

            res.status(200).json({
                success: true,
                message: "College updated successfully",
                data: college,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get single college by ID
    getCollegeById: async (req, res) => {
        try {
            const { id } = req.params;

            const college = await CollegeModel.findById(id);
            if (!college) {
                return res.status(404).json({ message: "College not found" });
            }

            res.status(200).json({
                success: true,
                data: college,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all colleges
    getAllColleges: async (req, res) => {
        try {
            const colleges = await CollegeModel.find();
            res.status(200).json({
                success: true,
                count: colleges.length,
                data: colleges,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete college
    deleteCollege: async (req, res) => {
        try {
            const { id } = req.params;

            const college = await CollegeModel.findByIdAndDelete(id);
            if (!college) {
                return res.status(404).json({ message: "College not found" });
            }

            res.status(200).json({
                success: true,
                message: "College deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default collegeController;