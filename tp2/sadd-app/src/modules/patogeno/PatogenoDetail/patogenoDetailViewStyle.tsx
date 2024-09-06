import { Box, styled } from "@mui/material";
import { ISxStyleObject } from "../../../libs/typings";

const LoadingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const Center = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  width: "100%",
  margin: "80px auto",
}));

const PatogenoDetailStyles: ISxStyleObject = {
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
};

export { LoadingContainer, Center, PatogenoDetailStyles };
