import express from "express";
import RouteModel from "../../models/route.js";
const router = express.Router();

router.delete("/:routeCode", async (req, res) => {
  const routeCode = req.params.routeCode;

  try {
    await RouteModel.deleteOne({
      code: routeCode,
    });

    res.json();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
