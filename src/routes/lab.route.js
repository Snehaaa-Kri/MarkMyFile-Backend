import express from "express";
import labController from "../controllers/lab.controller.js";
import { facultyAuth, studentAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Faculty-only routes
router.post("/", facultyAuth, labController.createLab);
router.put("/:id", facultyAuth, labController.updateLab);
router.delete("/:id", facultyAuth, labController.deleteLab);

// Public/General routes
router.get("/", labController.getAllLabs);
router.get("/:id", labController.getLabById);

// Student-only routes
router.post("/join", studentAuth, labController.joinLab);
router.post("/leave", studentAuth, labController.leaveLab);

export default router;