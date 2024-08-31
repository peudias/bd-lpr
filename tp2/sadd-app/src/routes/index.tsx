import { Routes, Route, Navigate } from "react-router-dom";
import PatogenoModule from "../modules/patogeno/patogenoContainer";
import { App } from "../App";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/patogeno/:screenState/:id?" element={<PatogenoModule />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
