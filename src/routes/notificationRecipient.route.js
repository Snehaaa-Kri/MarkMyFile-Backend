import express from "express";
import notificationRecipientController from "../controllers/notificationRecipient.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Auth required
router.post("/", validateJWT, notificationRecipientController.addRecipient);
router.put("/:id/read", validateJWT, notificationRecipientController.markAsRead);
router.get("/", validateJWT, notificationRecipientController.getMyNotifications);
router.delete("/:id", validateJWT, notificationRecipientController.removeRecipient);

export default router;