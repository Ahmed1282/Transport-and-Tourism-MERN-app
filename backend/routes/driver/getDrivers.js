import express from "express";
import DriverModel from "../../models/driver.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const driver = await DriverModel.find({});
    res.json(driver);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
