import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  fare: { type: String, required: true },
});

export default mongoose.model("Route", routeSchema);
