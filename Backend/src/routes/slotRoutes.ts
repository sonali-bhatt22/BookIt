import express from "express";
import { updateSlotOnBooking, getSlotAvailability } from "../controllers/slotController";

const router = express.Router();

router.post("/update", updateSlotOnBooking);
router.get("/:id/availability", getSlotAvailability);

export default router;
