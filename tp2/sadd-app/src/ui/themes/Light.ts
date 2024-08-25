import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: green[800],
      dark: green[700],
      light: green[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: blue[900],
      dark: blue[800],
      light: blue[700],
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#f7f6f3",
    },
  },
});
