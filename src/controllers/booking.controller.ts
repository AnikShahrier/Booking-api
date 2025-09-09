import { Request, Response } from "express";
import Booking from "../models/Booking";

// Create a booking
export const createBooking = async (req: Request, res: Response) => {
  const { title, description, date } = req.body;
  const booking = await Booking.create({ title, description, date, user: req.userId });
  res.status(201).json(booking);
};

// Get all bookings for current user
// Get all bookings for current user (with pagination)
export const getBookings = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const bookings = await Booking.find({ user: req.userId })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Booking.countDocuments({ user: req.userId });

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: bookings,
  });
};


// Get single booking
export const getBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.userId });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

// Update booking
export const updateBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

// Delete booking
export const deleteBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ message: "Booking deleted" });
};
