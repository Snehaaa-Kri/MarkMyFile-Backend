import NotificationRecipientModel from "../models/notificationRecipient.model.js";

const notificationRecipientController = {
    // Add a recipient to a notification
    addRecipient: async (req, res) => {
        try {
            const { notificationId, recipientId } = req.body;

            const existing = await NotificationRecipientModel.findOne({ 
                notification: notificationId, 
                recipient: recipientId 
            });
            if (existing) return res.status(400).json({ message: "Recipient already added" });

            const recipient = await NotificationRecipientModel.create({
                notification: notificationId,
                recipient: recipientId
            });

            res.status(201).json({
                success: true,
                message: "Recipient added successfully",
                data: recipient
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mark as read
    markAsRead: async (req, res) => {
        try {
            const { id } = req.params;
            const recipient = await NotificationRecipientModel.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true }
            );

            if (!recipient) return res.status(404).json({ message: "Recipient not found" });

            res.status(200).json({
                success: true,
                message: "Notification marked as read",
                data: recipient
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all notifications for a recipient
    getMyNotifications: async (req, res) => {
        try {
            const recipients = await NotificationRecipientModel.find({ recipient: req.user._id })
                .populate("notification")
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                count: recipients.length,
                data: recipients
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Remove recipient from a notification
    removeRecipient: async (req, res) => {
        try {
            const { id } = req.params;
            const recipient = await NotificationRecipientModel.findByIdAndDelete(id);

            if (!recipient) return res.status(404).json({ message: "Recipient not found" });

            res.status(200).json({
                success: true,
                message: "Recipient removed successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default notificationRecipientController;