import express from "express";
import submissionController from "../controllers/submission.controller.js";
import { facultyAuth, studentAuth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; // for handling file uploads

const router = express.Router();

// Student routes
router.post("/", studentAuth, upload.single("file"), submissionController.createSubmission);
router.get("/my/:assignmentId", studentAuth, submissionController.getMySubmission);

// Faculty routes
router.put("/:id/grade", facultyAuth, submissionController.gradeSubmission);
router.get("/assignment/:assignmentId", facultyAuth, submissionController.getSubmissionsForAssignment);

export default router;