import { useContext, useEffect, useMemo, useState } from "react";
import { LoadingContainer } from "./sintomaDetailViewStyle";
import { SintomaDetailControllerContext } from "./sintomaDetailController";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { SintomaModuleContext } from "../sintomaContainer";

const SintomaDetailView = () => {
  const { document, loading } = useContext(SintomaDetailControllerContext);
  const { state } = useContext(SintomaModuleContext);
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
      <Typography>Formulario detais sintomas</Typography>
    </Box>
  );
};

export default SintomaDetailView;
