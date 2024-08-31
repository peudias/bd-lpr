import { Routes, Route, Navigate } from "react-router-dom";
import PatogenoModule from "../modules/patogeno/patogenoContainer";
import Home from "../pages/home/Home";
import Logging from "../pages/logging/Logging";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/patogeno/:screenState/:id?" element={<PatogenoModule />} />
      <Route path="/logging" element={<Logging />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
