import express from "express";
import assignmentController from "../controllers/assignment.controller.js";
import { facultyAuth, studentAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Faculty-only routes
router.post("/", facultyAuth, assignmentController.createAssignment);
router.put("/:id", facultyAuth, assignmentController.updateAssignment);
router.delete("/:id", facultyAuth, assignmentController.deleteAssignment);

// General routes (students + faculty)
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);

export default router;
