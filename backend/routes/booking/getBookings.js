import express from "express";
import BookingModel from "../../models/booking.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings = await BookingModel.find({});
    res.json(bookings);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
