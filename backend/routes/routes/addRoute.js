import express from "express";
import RouteModel from "../../models/route.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newRoute = new RouteModel({
      ...req.body,
    });

    await newRoute.save();
    res.status(200).send("Route added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
