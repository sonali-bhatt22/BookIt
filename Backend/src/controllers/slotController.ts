import { Request, Response } from "express";
import Slot from "../models/Slot";

// slotController.ts
export const updateSlotOnBooking = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.body;

    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      { $inc: { booked: 1, capacity: -1 } },
      { new: true }
    );

    if (!updatedSlot)
      return res.status(404).json({ message: "Slot not found" });

    res.status(200).json({
      message: "Slot updated successfully",
      slot: updatedSlot,
    });
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getSlotAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // experienceId or slotId (you choose)
    const slots = await Slot.find({ experienceId: id });

    if (!slots || slots.length === 0)
      return res.status(404).json({ message: "No slots found" });

    // return each slot with remaining seats info
    const slotData = slots.map((slot) => ({
      _id: slot._id,
      date: slot.date,
      time: slot.time,
      capacity: slot.capacity,
      booked: slot.booked,
      remainingSeats: slot.capacity - slot.booked,
    }));

    res.status(200).json({ slots: slotData });
  } catch (error) {
    console.error("Error fetching slot availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
