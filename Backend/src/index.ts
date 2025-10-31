import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import slotRoutes from "./routes/slotRoutes";
import experienceRoutes from "./routes/experienceRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import promoRoutes from "./routes/promoRoutes"
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/experiences", experienceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/promo", promoRoutes)
app.use("/api/slots", slotRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;