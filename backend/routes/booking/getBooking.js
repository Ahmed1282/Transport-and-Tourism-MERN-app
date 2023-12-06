import express from "express";
import BookingModel from "../../models/booking.js";
const router = express.Router();

router.get("/:customerEmail", async (req, res) => {
  const customerEmail = req.params.customerEmail;

  try {
    const booking = await BookingModel.findOne({
      customerEmail: customerEmail,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
