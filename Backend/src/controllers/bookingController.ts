import Booking from "../models/Booking";
import Slot from "../models/Slot";
import { Request, Response } from "express";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, slotId, name, email, promoCode, totalPrice } =
      req.body;
    console.log("Received booking data:", req.body);
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    const existingBooking = await Booking.findOne({
      experienceId,
      slotId,
      $or: [{ name }, { email }],
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this experience." });
    }

    // if (slot.capacity === 0) slot.isBooked = true;
    if (slot.booked >= slot.capacity)
      return res.status(400).json({ message: "Slot already full" });
    // slot.booked += 1;
    await slot.save();

    const booking = await Booking.create({
      experienceId,
      slotId,
      name,
      email,
      promoCode,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json({
      message: "Booking confirmed successfully!",
      booking,
      capacity: slot.capacity,
      remainingSeats: slot.capacity - slot.booked,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

