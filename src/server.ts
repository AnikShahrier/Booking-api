import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.use(errorHandler);
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/booking_api")
  .then(() => {
    console.log("📦 MongoDB connected");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`🚀 API ready on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });
