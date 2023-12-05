import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  dateJoined: { type: String, required: true },
  isBooked: { type: Boolean, required: false },
});

export default mongoose.model("Driver", driverSchema);
