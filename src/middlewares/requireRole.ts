import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

declare module "express-serve-static-core" {
  interface Request {
    userRole?: "user" | "admin";
  }
}

export function requireRole(role: "user" | "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole !== role) {
      throw new ApiError(403, "Forbidden: Insufficient permissions");
    }
    next();
  };
}
