import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to require authentication
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role?: "user" | "admin"; // restrict role to allowed values
    };

    // attach to request (works because of declaration merging below)
    req.userId = payload.id;
    req.userRole = payload.role ?? "user"; // default role if missing

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Extend Express Request globally (so you don’t get duplicate identifier errors)
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}
