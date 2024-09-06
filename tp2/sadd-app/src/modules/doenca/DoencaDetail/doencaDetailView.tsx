import { useContext, useEffect, useMemo, useState } from "react";
import { LoadingContainer } from "./doencaDetailViewStyle";
import { DoencaDetailControllerContext } from "./doencaDetailController";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { DoencaModuleContext } from "../doencaContainer";

const DoencaDetailView = () => {
  const { document, loading } = useContext(DoencaDetailControllerContext);
  const { state } = useContext(DoencaModuleContext);
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
      <Typography>Formulário detalhes doenças</Typography>
    </Box>
  );
};

export default DoencaDetailView;
