import express from "express";
import RouteModel from "../models/routes.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProduct = new RouteModel({
      //   ...req.body,
      name: "TESTING",
    });

    await newProduct.save();
    res.status(200).send("Product added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
