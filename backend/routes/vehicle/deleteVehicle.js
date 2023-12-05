import express from "express";
import VehicleModel from "../../models/vehicle.js";
const router = express.Router();

router.delete("/:licensePlate", async (req, res) => {
  const vehicleLicenseNumber = req.params.licensePlate;

  try {
    const deletedVehicle = await VehicleModel.deleteOne({
      licensePlate: vehicleLicenseNumber,
    });

    res.json();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
