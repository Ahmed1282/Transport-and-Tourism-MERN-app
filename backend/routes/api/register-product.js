import express from "express";
import ProductModel from "../../models/product.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel({
      ...req.body,
    });
    await newProduct.save();
    res.status(200).send("Product added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
