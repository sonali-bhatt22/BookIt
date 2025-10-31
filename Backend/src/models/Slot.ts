import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    experienceId: {type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true},
    date: { type: Date, required: true },           
    time: { type: String, required: true },         
    booked: { type: Number, default: 0 },
    capacity: { type: Number, required: true },
}, { timestamps: true })
slotSchema.index({ experienceId: 1, date: 1, time: 1 }, { unique: true });
export default mongoose.model("Slot", slotSchema)
