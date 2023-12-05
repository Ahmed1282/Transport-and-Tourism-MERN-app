import express from "express";
import RouteModel from "../../models/route.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const updatedRoute = req.body;
  try {
    const route = await RouteModel.findOneAndUpdate(
      { code: updatedRoute.code },
      updatedRoute
    );
    res.json(updatedRoute);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
