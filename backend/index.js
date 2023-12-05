import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import addVehicle from "./routes/vehicle/addVehicle.js";
import getVehicles from "./routes/vehicle/getVehicles.js";
import deleteVehicle from "./routes/vehicle/deleteVehicle.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import addbookings from "./routes/addbookings.js";
import addDriver from "./routes/driver/addDriver.js";
import getDriver from "./routes/driver/getDrivers.js";
import deleteDriver from "./routes/driver/deleteDriver.js";
import addRoute from "./routes/routes/addRoute.js";
import getRoute from "./routes/routes/getRoute.js";
import deleteRoute from "./routes/routes/deleteRoute.js";
import editRoute from "./routes/routes/editRoute.js";
import getBookings from "./routes/booking/getBookings.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/add-vehicle", addVehicle);
app.use("/get-vehicles", getVehicles);
app.use("/delete-vehicle/", deleteVehicle);
app.use("/signup", signup);
app.use("/login", login);
app.use("/add-driver", addDriver);
app.use("/get-drivers", getDriver);
app.use("/delete-driver/", deleteDriver);
app.use("/add-route", addRoute);
app.use("/get-routes", getRoute);
app.use("/delete-route/", deleteRoute);
app.use("/edit-route", editRoute);
app.use("/addbookings", addbookings);
app.use("/get-bookings", getBookings);

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
