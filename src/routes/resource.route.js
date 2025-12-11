import express from "express";
import resourceController from "../controllers/resource.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", validateJWT, resourceController.createResource);
router.put("/:id", validateJWT, resourceController.updateResource);
router.get("/:id", validateJWT, resourceController.getResourceById);
router.get("/", validateJWT, resourceController.getAllResources);
router.delete("/:id", validateJWT, resourceController.deleteResource);

export default router;