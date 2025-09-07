import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  const err: any = new Error("Route not found");
  err.status = 404;
  next(err);
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      details: err.flatten()
    });
  }

  // if you use ApiError class, handle it here (optional)
  // @ts-ignore
  if (err?.status && (err as any).message) {
    // @ts-ignore
    return res.status(err.status).json({ success: false, message: err.message, details: err.details || null });
  }

  console.error(err);
  return res.status(500).json({ success: false, message: "Internal server error" });
}
