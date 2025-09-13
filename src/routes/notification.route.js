import express from "express";
import notificationController from "../controllers/notificationController.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Auth required
router.post("/", validateJWT, notificationController.createNotification);
router.put("/:id", validateJWT, notificationController.updateNotification);
router.get("/:id", validateJWT, notificationController.getNotificationById);
router.get("/", validateJWT, notificationController.getMyNotifications);
router.delete("/:id", validateJWT, notificationController.deleteNotification);

export default router;