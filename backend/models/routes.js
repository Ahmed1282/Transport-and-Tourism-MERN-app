import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
  name: { type: String, required: true },
});

export default mongoose.model("Route", routeSchema);
