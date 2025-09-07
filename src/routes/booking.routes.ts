import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.use(requireAuth); // all routes protected

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
