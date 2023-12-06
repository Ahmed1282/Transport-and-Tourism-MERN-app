import express from "express";
import BookingModel from "../models/booking.js"; // Adjust the path to your booking model
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newBooking = new BookingModel({
      ...req.body,
      status: "Pending", // Setting the initial status to 'pending'
    });

    await newBooking.save();
    res.status(200).send(newBooking);
  } catch (error) {
    console.log(error);
    // Adjust the error message as per your application's needs
    res.status(500).send("Error creating booking");
  }
});

export default router;
