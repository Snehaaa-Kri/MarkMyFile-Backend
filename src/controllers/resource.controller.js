import ResourceModel from "../models/resource.model.js";

const resourceController = {
    // Create a new resource
    createResource: async (req, res) => {
        try {
            const { title, description, type, link } = req.body;

            const resource = await ResourceModel.create({
                title,
                description,
                type,
                link,
                uploadedBy: req.user._id
            });

            res.status(201).json({
                success: true,
                message: "Resource created successfully",
                data: resource
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a resource
    updateResource: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const resource = await ResourceModel.findByIdAndUpdate(id, updates, { new: true });
            if (!resource) return res.status(404).json({ message: "Resource not found" });

            res.status(200).json({
                success: true,
                message: "Resource updated successfully",
                data: resource
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get resource by ID
    getResourceById: async (req, res) => {
        try {
            const { id } = req.params;
            const resource = await ResourceModel.findById(id).populate("uploadedBy", "name email");
            if (!resource) return res.status(404).json({ message: "Resource not found" });

            res.status(200).json({
                success: true,
                data: resource
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all resources
    getAllResources: async (req, res) => {
        try {
            const resources = await ResourceModel.find().populate("uploadedBy", "name email");
            res.status(200).json({
                success: true,
                count: resources.length,
                data: resources
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete resource
    deleteResource: async (req, res) => {
        try {
            const { id } = req.params;
            const resource = await ResourceModel.findByIdAndDelete(id);
            if (!resource) return res.status(404).json({ message: "Resource not found" });

            res.status(200).json({
                success: true,
                message: "Resource deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default resourceController;