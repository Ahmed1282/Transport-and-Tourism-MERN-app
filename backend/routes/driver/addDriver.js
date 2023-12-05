import express from "express";
import DriverModel from "../../models/driver.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newDriver = new DriverModel({
      ...req.body,
    });

    await newDriver.save();
    res.status(200).send("Driver added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
