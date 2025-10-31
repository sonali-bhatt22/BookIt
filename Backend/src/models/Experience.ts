import mongoose from "mongoose";
import Slot from "./Slot";

const experienceSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    location: {type: String, required: true}
    
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);