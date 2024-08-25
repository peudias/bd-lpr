import { Routes, Route, Navigate } from "react-router-dom";
import DrawerAppBar from "../ui/layout/app";
import PatogenoModule from "../modules/patogeno/patogenoContainer";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<DrawerAppBar />} />
      <Route path="/patogeno/:screenState/:id?" element={<PatogenoModule />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
