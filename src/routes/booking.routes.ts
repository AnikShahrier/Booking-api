import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getAllBookings
} from "../controllers/booking.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validate } from "../middlewares/validate";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema";
import { requireRole } from "../middlewares/requireRole";


const router = express.Router();

router.get("/all", requireAuth, requireRole("admin"), getAllBookings);

router.use(requireAuth);

router.post("/", validate(createBookingSchema), createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.put("/:id", validate(updateBookingSchema), updateBooking);
router.delete("/:id", deleteBooking);

export default router;
