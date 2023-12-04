import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  type: { type: String, default: "user", required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: "user", required: true, unique: true },
});

export default mongoose.model("User", userSchema);
