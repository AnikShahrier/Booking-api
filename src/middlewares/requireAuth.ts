import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Middleware to require authentication
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    // fetch user to get role (safer than embedding role in token)
    const user = await User.findById(payload.id).select("role");
    
    if (!user) return res.status(401).json({ message: "Invalid token (user missing)" });

    req.userId = user.id;
    const role = (user.role || "user").toLowerCase();
    const roleStr = (user.get('role') as string || "user").toLowerCase();
    req.userRole = roleStr === "admin" ? "admin" : "user";
    


    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Extend Express Request globally (so you don’t get duplicate identifier errors)
declare global {
  namespace Express {
    interface Request {
      userRole?: "user" | "admin";
      userId?: string;
    }
  }
}
