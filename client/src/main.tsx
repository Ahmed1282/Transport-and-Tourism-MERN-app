import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageRoutesPage from "./components/pages/admin/ManageRoutesPage";
import Dashboard from "./components/pages/admin/Dashboard";

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
            element={<ManageRoutesPage />}
          />
        </Routes>

        <Routes>
          <Route
            path="/dashboard/manage-bookings"
            element={<ManageRoutesPage />}
          />
        </Routes>

        <Routes>
          <Route
            path="/dashboard/manage-drivers"
            element={<ManageRoutesPage />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
