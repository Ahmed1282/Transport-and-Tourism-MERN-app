import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Booking Date
  time: { type: String, required: true }, // Booking Time
  origin: { type: String, required: true }, // Origin Location
  destination: { type: String, required: true }, // Destination Location
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Confirmed", "Cancelled"], // Enum to restrict the status values
  },
  routeCode: { type: String, default: null },
  fare: { type: Number, default: null }, // Route Code, default is null
  driver: { type: Object, default: null },
  customerEmail: { type: String, default: null },
});

export default mongoose.model("Booking", bookingSchema);
