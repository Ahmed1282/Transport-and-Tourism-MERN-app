import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageRoutesPage from "./components/pages/admin/ManageRoutes";
import Dashboard from "./components/pages/admin/Dashboard";
import ManageVehicles from "./components/pages/admin/ManageVehicles";
import SignUpPage from "./components/pages/customer/SignUp";
import LogInPage from "./components/pages/customer/LogIn";
import HomePage from "./components/pages/customer/HomePage";
import ManageDrivers from "./components/pages/admin/ManageDrivers";
import AddDriverModal from "./components/pages/admin/ManageBookings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
          </Route>
        </Routes> */}

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Routes>
          <Route
            path="/dashboard/manage-routes"
            element={<ManageRoutesPage />}
          />
        </Routes>

        <Routes>
          <Route
            path="/dashboard/manage-vehicles"
            element={<ManageVehicles />}
          />
        </Routes>

        <Routes>
          <Route
            path="/dashboard/manage-bookings"
            element={<AddDriverModal />}
          />
        </Routes>

        <Routes>
          <Route path="/dashboard/manage-drivers" element={<ManageDrivers />} />
          <Route path="/manage-routes" element={<ManageRoutesPage />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
