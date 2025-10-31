import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  name: { type: String, required: true, },
  email: { type: String, required: true, unique:true },
  promoCode: { type: String },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "failed", "pending", "cancelled"], default: "confirmed" },

})
bookingSchema.index({ slotId: 1, email: 1 }, { unique: false });

export default mongoose.model("Booking", bookingSchema)