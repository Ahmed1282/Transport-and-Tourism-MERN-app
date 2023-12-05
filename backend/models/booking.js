import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },            // Booking Date
  time: { type: String, required: true },          // Booking Time
  origin: { type: String, required: true },        // Origin Location
  destination: { type: String, required: true },   // Destination Location
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'confirmed', 'cancelled']    // Enum to restrict the status values
  },
  routeCode: { type: String, default: null }       // Route Code, default is null
});

export default mongoose.model("Booking", bookingSchema);