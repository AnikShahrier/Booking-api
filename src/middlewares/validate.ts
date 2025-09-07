import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodObject, ZodRawShape } from "zod";

export const validate =
  (schema: ZodObject<ZodRawShape>): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      // replace body with parsed (and typed) object
      req.body = parsed;
      return next();
    } catch (err) {
      return next(err); // forward ZodError to your error handler
    }
  };
