import express from "express";
import facultyController from "../controllers/faculty.controller.js";
import upload from "../middlewares/upload.middleware.js";
import { validateJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
// Register Faculty Profile
router.post(
  "/register",
  validateJWT,
  authorizeRoles("faculty"),
  upload.single("profileImage"),
  facultyController.register
);

// Get Faculty Profile
router.get(
  "/profile",
  validateJWT,
  authorizeRoles("faculty"),
  facultyController.getProfile
);

// Update Faculty Profile
router.put(
  "/updateProfile",
  validateJWT,
  authorizeRoles("faculty"),
  upload.single("profileImage"),
  facultyController.updateProfile
);

// Delete Faculty Profile
router.delete(
  "/deleteProfile",
  validateJWT,
  authorizeRoles("faculty"),
  facultyController.deleteProfile
);

export default router;
