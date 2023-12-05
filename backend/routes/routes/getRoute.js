import express from "express";
import RouteModel from "../../models/route.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const route = await RouteModel.find({});
    res.json(route);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
