import { z } from "zod";

// Convert incoming strings to Date where possible
const dateFromString = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  return arg;
}, z.date().refine((date) => !isNaN(date.getTime()), {
  message: "Invalid or missing date"
}));

export const createBookingSchema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().optional(),
  date: dateFromString,
  location: z.string().optional()
});

export const updateBookingSchema = createBookingSchema.partial();
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
