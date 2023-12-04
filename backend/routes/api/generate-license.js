import express from "express";
import ProductModel from "../../models/product.js";
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { productId, licenseKey } = req.body.updatedProductDetails;
    const dbResponse = await ProductModel.findByIdAndUpdate(productId, {
      licenseKey: licenseKey,
    });
    res.status(200).send("License key set successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Server Error");
  }
});

export default router;
