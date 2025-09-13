import express from "express";
import collegeController from "../controllers/college.controller.js";

const router = express.Router();

// Create college
router.post("/", collegeController.createCollege);

// Update college
router.put("/:id", collegeController.updateCollege);

// Get single college by ID
router.get("/:id", collegeController.getCollegeById);

// Get all colleges
router.get("/", collegeController.getAllColleges);

// Delete college
router.delete("/:id", collegeController.deleteCollege);

export default router;
