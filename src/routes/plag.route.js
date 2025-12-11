import express from "express";
import { checkPlag } from "../controllers/plag.controller.js";

const router = express.Router();

router.post("/check-plag", checkPlag);

export default router;
