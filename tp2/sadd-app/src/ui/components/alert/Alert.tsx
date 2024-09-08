import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertStyles } from "./AlertStyles";
import {
  Box,
  Tooltip,
  Typography,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";

interface IAlertProps {
  type: "success" | "error" | "warning" | "info";
  menssage: string | null;
}

// Criação de um tema customizado para modificar o Tooltip
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "black",
          backgroundColor: "white",
          letterSpacing: "0.5px",
        },
        arrow: {
          color: "white",
        },
      },
    },
  },
});

export const AlertComponent: React.FC<IAlertProps> = ({
  type,
  menssage,
}: IAlertProps) => {
  const [visible, setVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(intervalRef.current!);
          setVisible(false);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  React.useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopTimer();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  if (!visible) return null;

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={AlertStyles.content} spacing={2}>
        <Box
          sx={AlertStyles.alertProgressContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Alert variant="filled" severity={type}>
            <Tooltip title={menssage} arrow>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {menssage ?? "Mensagem"}
              </Typography>
            </Tooltip>
          </Alert>
          <Box sx={AlertStyles.progressBar} style={{ width: `${progress}%` }} />
        </Box>
      </Stack>
    </ThemeProvider>
  );
};
