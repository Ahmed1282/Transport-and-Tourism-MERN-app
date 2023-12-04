import express from "express";
import ProductModel from "../../models/product.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
