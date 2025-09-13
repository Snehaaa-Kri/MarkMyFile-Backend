import NotificationModel from "../models/notification.model.js";

const notificationController = {
    // Create a new notification
    createNotification: async (req, res) => {
        try {
            const { title, message, recipient } = req.body;

            const notification = await NotificationModel.create({
                title,
                message,
                recipient,   // userId of student/faculty
                sender: req.user._id
            });

            res.status(201).json({
                success: true,
                message: "Notification created successfully",
                data: notification
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a notification
    updateNotification: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const notification = await NotificationModel.findByIdAndUpdate(id, updates, { new: true });
            if (!notification) return res.status(404).json({ message: "Notification not found" });

            res.status(200).json({
                success: true,
                message: "Notification updated successfully",
                data: notification
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single notification
    getNotificationById: async (req, res) => {
        try {
            const { id } = req.params;
            const notification = await NotificationModel.findById(id)
                .populate("sender", "name email")
                .populate("recipient", "name email");

            if (!notification) return res.status(404).json({ message: "Notification not found" });

            res.status(200).json({
                success: true,
                data: notification
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all notifications for the logged-in user
    getMyNotifications: async (req, res) => {
        try {
            const notifications = await NotificationModel.find({ recipient: req.user._id })
                .sort({ createdAt: -1 })
                .populate("sender", "name email");

            res.status(200).json({
                success: true,
                count: notifications.length,
                data: notifications
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a notification
    deleteNotification: async (req, res) => {
        try {
            const { id } = req.params;
            const notification = await NotificationModel.findByIdAndDelete(id);
            if (!notification) return res.status(404).json({ message: "Notification not found" });

            res.status(200).json({
                success: true,
                message: "Notification deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default notificationController;