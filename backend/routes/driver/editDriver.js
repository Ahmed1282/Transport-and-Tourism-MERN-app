import express from "express";
import DriverModel from "../../models/driver.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const updatedDriver = req.body;
  try {
    const driver = await DriverModel.findOneAndUpdate(
      { licenseNumber: updatedDriver.licenseNumber },
      updatedDriver
    );

    res.json(updatedDriver);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
