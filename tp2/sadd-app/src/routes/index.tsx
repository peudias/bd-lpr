import { Routes, Route, Navigate } from "react-router-dom";
import PatogenoModule from "../modules/patogeno/patogenoContainer";
import Home from "../pages/home/Home";
import Logging from "../pages/logging/Logging";
import DoencaModule from "../modules/doenca/doencaContainer";
import SintomaModule from "../modules/sintoma/sintomaContainer";
import ApoioDiagnostico from "../pages/apoioDiagnostico/ApoioDiagnostico";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/doenca/:screenState/:id?" element={<DoencaModule />} />
      <Route path="/patogeno/:screenState/:id?" element={<PatogenoModule />} />
      <Route path="/sintoma/:screenState/:id?" element={<SintomaModule />} />
      <Route path="/apoio/diagnostico" element={<ApoioDiagnostico />} />
      <Route path="/logging" element={<Logging />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
