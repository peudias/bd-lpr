import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { CustomTheme } from "./ui/themes";

export const App = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
