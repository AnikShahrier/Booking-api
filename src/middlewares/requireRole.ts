import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      role: "user" | "admin";
      [key: string]: any;
    };
    userRole?: "user" | "admin";
  }
}

export function requireRole(role: "user" | "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("requireRole - req.userRole:", req.userRole, "required:", role);
    if (!req.userRole || req.userRole.toLowerCase() !== role.toLowerCase()) {
  throw new ApiError(403, "Forbidden: Insufficient permissions");
}

    next();
  };
}
