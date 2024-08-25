import { Routes, Route, Navigate } from "react-router-dom";
import DrawerAppBar from "../ui/layout/app";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<DrawerAppBar />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
