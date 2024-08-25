import { createTheme } from "@mui/material";

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#46818B",   // Verde-azulado como a cor principal
      dark: "#3b6a6b",   // Um tom mais escuro para contraste
      light: "#5a9b9f",  // Um tom mais claro para estados de hover
      contrastText: "#ffffff", // Texto branco para contraste
    },
    secondary: {
      main: "#6ec6ff",   // Azul claro para destacar
      dark: "#0091ea",   // Azul escuro para contraste
      light: "#b3e5fc",  // Azul claro para estados de hover
      contrastText: "#ffffff", // Texto branco para contraste
    },
    background: {
      paper: "#ffffff", // Fundo de elementos
      default: "#f0f4f4", // Fundo da aplicação (um tom muito claro de verde-azulado)
    },
    text: {
      primary: "#333333", // Texto principal em cinza escuro
      secondary: "#666666", // Texto secundário em cinza médio
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Fonte padrão
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#46818B", // Cor do título principal
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#46818B", // Cor do subtítulo
    },
    body1: {
      fontSize: "1rem",
      color: "#333333", // Cor do texto do corpo
    },
  },
});
