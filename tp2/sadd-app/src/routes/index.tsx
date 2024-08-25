import { Box, Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Box>
            <Button variant="contained" color="primary">
              Pagina home
            </Button>
            <Button variant="contained" color="secondary">
              Pagina home
            </Button>
            <Button variant="outlined" color="primary">
              Pagina home
            </Button>
            <Button variant="outlined" color="secondary">
              Pagina home
            </Button>
            <Button variant="text" color="primary">
              Pagina home
            </Button>
            <Button variant="text" color="secondary">
              Pagina home
            </Button>
          </Box>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
