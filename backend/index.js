import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import addRoute from "./routes/addRoute.js";
import addVehicle from "./routes/vehicle/addVehicle.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/add-route", addRoute);
app.use("/add-vehicle", addVehicle);

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
