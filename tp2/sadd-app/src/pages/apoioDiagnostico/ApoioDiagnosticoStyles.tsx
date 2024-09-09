import { Box, styled } from "@mui/material";
import { ISxStyleObject } from "../../libs/typings";

const LoadingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const EsperandoSintomas = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "50px",
}));

const ApoioDiagnosticoStyles: ISxStyleObject = {};

export { LoadingContainer, EsperandoSintomas, ApoioDiagnosticoStyles };
