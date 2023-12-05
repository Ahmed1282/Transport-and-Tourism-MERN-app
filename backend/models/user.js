import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First Name
  lastName: { type: String, required: true },  // Last Name
  phoneNumber: { type: String, required: true }, // Phone Number
  email: { type: String, required: true, unique: true }, // Email
  password: { type: String, required: true }, // Password
});

export default mongoose.model("User", userSchema);
