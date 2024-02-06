import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import { APP_STORAGE } from "./../storage/AppStorage";

export default function CircularIntegration() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[50],
      "&:hover": {
        bgcolor: green[50],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const set_sendCode = () => {
    if (APP_STORAGE.getCode() === null) {
      APP_STORAGE.setError(true);
      APP_STORAGE.setErrorMass("Введите код подтверждения");
    }

    if (!loading && APP_STORAGE.getCode() !== null) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(
        () => {
          setSuccess(true);
          setLoading(false);
        },
        1000,
        APP_STORAGE.set_SendCode()
      );
    }
  };

  return (
    <Box sx={{}}>
      <Box sx={{ m: 1, position: "relative" }}></Box>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          fullWidth
          sx={{
            mt: "14px",
            mb: "14px",
            background: "#edf2ff",
            color: "#1976d2;",
          }}
          disabled={loading}
          onClick={set_sendCode}
        >
          Подтвердить
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
