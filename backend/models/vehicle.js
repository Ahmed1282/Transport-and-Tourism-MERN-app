import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  capacity: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  bookingDetails: { type: Object, default: null },
});

export default mongoose.model("Vehicle", vehicleSchema);
