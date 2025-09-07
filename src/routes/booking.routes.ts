import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller";
import { requireAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema";

const router = express.Router();

router.use(requireAuth);

router.post("/", validate(createBookingSchema), createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.put("/:id", validate(updateBookingSchema), updateBooking);
router.delete("/:id", deleteBooking);

export default router;
