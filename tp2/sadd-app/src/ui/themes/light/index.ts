import { createTheme } from "@mui/material";
import SysFonts from "../fonts/SysFonts";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = SysFonts.getTypography();

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#46818B",
      dark: "#3b6a6b",
      light: "#5a9b9f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6ec6ff",
      dark: "#0091ea",
      light: "#b3e5fc",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#f0f4f4",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
