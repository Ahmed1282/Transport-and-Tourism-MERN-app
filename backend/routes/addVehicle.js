import express from "express";
import VehicleModel from "../models/vehicle.js";
const router = express.Router();

router.post("/", async (req, res) => {

  try {
    const newVehicle = new VehicleModel({
      //   ...req.body,
      name: "TESTING",
    });

    await newVehicle.save();
    res.status(200).send("Vehicle added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
