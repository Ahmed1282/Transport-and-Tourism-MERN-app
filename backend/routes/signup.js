import express from "express";
import UserModel from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const newUser = new UserModel({
      ...req.body,
      type: "user",
    });
    await newUser.save();
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send("Email already in use");
  }
});

export default router;
