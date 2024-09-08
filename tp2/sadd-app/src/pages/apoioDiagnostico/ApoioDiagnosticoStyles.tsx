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

const ApoioDiagnosticoStyles: ISxStyleObject = {};

export { LoadingContainer, ApoioDiagnosticoStyles };
