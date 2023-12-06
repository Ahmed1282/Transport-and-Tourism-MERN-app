import express from "express";
import BookingModel from "../../models/booking.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const updatedBooking = req.body;
  try {
    const booking = await BookingModel.findOneAndUpdate(
      { _id: updatedBooking._id },
      updatedBooking
    );
    res.json(updatedBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
