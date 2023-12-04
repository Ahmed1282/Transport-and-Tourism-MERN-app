import express from "express";
import ProductModel from "../../models/product.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const owner = req.body;
  try {
    const products = await ProductModel.find({
      owner: owner,
    });
    res.json(products);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
