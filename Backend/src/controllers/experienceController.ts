import { Request, Response} from "express";

import Experience from "../models/Experience";
import Slot from "../models/Slot";

export const getExperinces = async (req:Request, res: Response)=>{
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch the experiences"});
    }
}

export const getExperinceById = async (req:Request, res: Response) =>{
    try {
         console.log("Received ID:", req.params.id); 
        const experience = await Experience.findById(req.params.id);
        if(!experience) return res.status(404).json({message: "Not found"});
        const slots = await Slot.find({ experienceId: experience._id, booked: 0});
        res.json({experience, slots})
    } catch (error) {
        res.status(500).json({ message: "Error fetching experience details" });
    }
}
