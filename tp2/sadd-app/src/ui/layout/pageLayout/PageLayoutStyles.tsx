import { Box, styled } from "@mui/material";

const Page = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "960px",
  margin: "0 auto",
  padding: "0 20px",
  display: "flex",
  gap: "18px",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "300px",
  },
}));

const HeaderPage = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "48px",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
}));

const TitlePage = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "18px",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "18px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    gap: "18px",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  "& > :last-child": {
    marginLeft: "auto",
  },
  "& > *:empty": {
    display: "none",
  },
}));

export { Page, HeaderPage, TitlePage, SearchContainer };
