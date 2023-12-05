import express from "express";
import VehicleModel from "../../models/vehicle.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vehicle = await VehicleModel.find({});
    res.json(vehicle);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
