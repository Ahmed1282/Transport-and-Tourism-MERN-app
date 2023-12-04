import express from "express";
import UserModel from "../../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const loginInfo = req.body;
    const userType = loginInfo.isAdmin ? "admin" : "user";
    const dbRes = await UserModel.findOne({
      email: loginInfo.email,
      password: loginInfo.password,
      type: userType,
    });

    if (dbRes === null) res.status(500).send(false);
    else {
      res.status(200).send(dbRes);
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
