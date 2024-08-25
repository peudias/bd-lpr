import { useContext, useEffect, useMemo, useState } from "react";
import { LoadingContainer } from "./patogenoDetailViewStyle";
import { PatogenoDetailControllerContext } from "./patogenoDetailController";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { PatogenoModuleContext } from "../patogenoContainer";

const PatogenoDetailView = () => {
  const { document, loading } = useContext(PatogenoDetailControllerContext);
  const { state } = useContext(PatogenoModuleContext);
  console.log("ESTADO DA TELA = ", state);
  console.log("DOCUMENTO = ", document);

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1">
          Aguarde, carregando informações...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <Box>
      <Typography>Formulario detais patogeno</Typography>
    </Box>
  );
};

export default PatogenoDetailView;
