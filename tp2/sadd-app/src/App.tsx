import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { CustomTheme } from "./ui/themes";
import { GlobalStyles } from "@mui/material";
import DrawerAppBar from "./ui/layout/appSideBar/AppSideBar";

export const App = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, width: "100%", height: "100%" },
          body: { margin: 0, padding: 0, width: "100%", height: "100%" },
          "*": { boxSizing: "border-box" },
        }}
      />
      <BrowserRouter>
        <DrawerAppBar />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
