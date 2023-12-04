import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  capacity: { type: String, required: true },
  license_plate: { type: String, required: true },
});

export default mongoose.model("Vehicle", vehicleSchema);
