import mongoose from "mongoose";
import connectDB from "../config/db";
import Experience from "../models/Experience";
import Slot from "../models/Slot";
import dotenv from "dotenv";
dotenv.config()
const seedData = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to db for seeding");
        const delSlots = await Slot.deleteMany({});
        const delExp = await Experience.deleteMany({});
       console.log(`🧹 Deleted ${delExp.deletedCount} experiences and ${delSlots.deletedCount} slots`);
        const experiences = await Experience.insertMany([
            {
    "title": "Kayaking",
    "description": "Curated small-group experience. Certified guide. Safety first with gear included. ",
    "image": "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031",
    "price": 999,
    "location": "Udupi",
    "id": "1"
  },
  {
    "title": "Nandi Hills Sunrise",
    "description": "Adrenaline-filled journey. Certified guides ensure fun and safety at every step.",
    "image": "https://images.unsplash.com/photo-1706510931467-d6e406cf4f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032",
    "price": 899,
    "location": "Banglore",
    "id": "2"
  },
  {
    "title": "Coffee Trail",
    "description": "High-energy experience. Designed for thrill-seekers. Safety first, always. ",
    "image": "https://media.istockphoto.com/id/1038217660/photo/holiday-destination-in-a-forest-trip-by-the-fire.webp?a=1&b=1&s=612x612&w=0&k=20&c=cYM84EeX5pVKjnq_xUMH1-RsbLUM7RKcXmhpRXEjpZ8=",
    "price": 1299,
    "location": "Coorg",
    "id": "3"
  },
  {
    "title": "Boat Cruise",
    "description": "Guided by professionals. Outdoor excitement with complete safety assurance.",
    "image": "https://images.unsplash.com/photo-1638123657021-f9aca72f8caf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "price": 999,
    "location": "Udupi, Karnataka",
    "id": "4"
  },
  {
    "title": "Bunjee Jumping",
    "description": "Discover your wild side. Adventure with trained experts and top-notch equipment.",
    "image": "https://images.unsplash.com/photo-1549221360-456a9c197d5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
    "price": 899,
    "location": "Manali",
    "id": "5"
  },
  {
    "title": "River Rafting",
    "description": "Unleash the explorer in you. Small groups, big thrills, all gear provided.",
    "image": "https://plus.unsplash.com/premium_photo-1661889971049-6f0a39a3476f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    "price": 999,
    "location": "Sundarban",
    "id": "6"
  },
  {
    "title": "Scuba Diving",
    "description": "Exciting escapade. Expert-led, safety-tested, and unforgettable.",
    "image": "https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "price": 1000,
    "location": "Puducherry",
    "id": "7"
  },
  {
    "title": "Snorkeling",
    "description": "Adventurous moments await. Certified guides, secure gear, lasting memories",
    "image": "https://images.unsplash.com/photo-1664922114319-4700c0ef74b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    "price": 999,
    "location": "Kasauli",
    "id": "8"
  },
  {
    "title": "Camping",
    "description": "Action-packed experience. Adventure made safe, guided, and unforgettable.",
    "image": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "price": 1299,
    "location": "Shimla",
    "id": "9"
  },
  {
    "title": "Trekking / Hiking",
    "description": "Thrilling outdoor adventure. Expert instructors. Safety gear provided for every participant.",
    "image": "https://images.unsplash.com/photo-1593739742226-5e5e2fdb1f1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "price": 1200,
    "location": "Uttrakhand",
    "id": "10"
  }
        ]);
        

        const slotPromises = experiences.map(exp=>{
            const today = new Date();
            return Slot.insertMany([
                {
          experienceId: exp._id,
          date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
          time: "9:00 AM - 11:00 AM",
          capacity: 10,
          booked: 0
        },
        {
          experienceId: exp._id,
          date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
          time: "12:00 PM - 2:00 PM",
          capacity: 10,
          booked: 0
        },
        {
          experienceId: exp._id,
          date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
          time: "3:00 PM - 5:00 PM",
          capacity: 10,
          booked: 0
        }
            ])
        });
        await Promise.all(slotPromises);
        console.log("🌱 Database seeded successfully!");
         process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);

    }
}

seedData();