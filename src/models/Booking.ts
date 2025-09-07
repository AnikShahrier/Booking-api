import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  title: string;
  description: string;
  date: Date;
  user: mongoose.Types.ObjectId;
}

const BookingSchema = new Schema<IBooking>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model<IBooking>("Booking", BookingSchema);
