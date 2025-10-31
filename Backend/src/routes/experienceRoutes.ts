import express from "express";
import { getExperinceById, getExperinces } from "../controllers/experienceController";

const router = express.Router();

router.get("/", getExperinces);
router.get("/:id", getExperinceById);
export default router;
