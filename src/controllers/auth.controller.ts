import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "Email already in use" });

  // Create user
  const user = await User.create({ name, email, password });

  // Create JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Get current user
export const me = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
