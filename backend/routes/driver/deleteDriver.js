import express from "express";
import DriverModel from "../../models/driver.js";
const router = express.Router();

router.delete("/:licenseNumber", async (req, res) => {
  const driverLicenseNumber = req.params.licenseNumber;

  try {
    await DriverModel.deleteOne({
      licenseNumber: driverLicenseNumber,
    });

    res.json();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
