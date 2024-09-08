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

const Left = styled(Box)(({ theme }) => ({
  maxWidth: "100%",
  width: "100%",
  margin: "60px auto 0px 0px",
}));

const DoencaDetailStyles: ISxStyleObject = {
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formFirstLine: {
    display: "flex",
    flexDirection: {
      sm: "row",
      xs: "column",
    },
    gap: {
      sm: "25px",
      xs: "20px",
    },
  },
  buttonSave: {
    width: "150px",
    alignSelf: "flex-end",
  },
  inputText: {
    maxWidth: {
      sm: "50%",
      xs: "100%",
    },
    width: "100%",
  },
};

export { LoadingContainer, Left, DoencaDetailStyles };
