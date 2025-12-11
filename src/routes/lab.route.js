import express from "express";
import labController from "../controllers/lab.controller.js";
import { validateJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Faculty routes
router.post("/", validateJWT, authorizeRoles("faculty"), labController.createLab);
router.put("/:id", validateJWT, authorizeRoles("faculty"), labController.updateLab);
router.delete("/:id", validateJWT, authorizeRoles("faculty"), labController.deleteLab);

// Public routes
router.get("/", labController.getAllLabs);
router.get("/:id", labController.getLabById);

// Student routes
router.post("/join", validateJWT, authorizeRoles("student"), labController.joinLab);
router.post("/leave", validateJWT, authorizeRoles("student"), labController.leaveLab);

export default router;