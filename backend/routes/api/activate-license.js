import express from "express";
import ProductModel from "../../models/product.js";
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { license, owner } = req.body;
    const dbResponse = await ProductModel.findOneAndUpdate(
      { licenseKey: license },
      { owner: owner, isActivated: true },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send("License key set successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Server Error");
  }
});

export default router;
