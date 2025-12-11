import express from "express";
import assignmentController from "../controllers/assignment.controller.js";
// import { facultyAuth, studentAuth } from "../middlewares/auth.middleware.js";
import { authorizeRoles, validateJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Faculty-only routes
router.post("/", validateJWT, authorizeRoles('faculty'), assignmentController.createAssignment);
router.put("/:id", validateJWT, authorizeRoles('faculty'), assignmentController.updateAssignment);
router.delete("/:id",validateJWT, authorizeRoles('faculty'), assignmentController.deleteAssignment);

// General routes (students + faculty)
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);

export default router;
