import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import { Button, Alert } from "@mui/material";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../source/client/src/storage/AppStorage";

export const CircularIntegration = observer(() => {
  // const [loading, setLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(
    APP_STORAGE.auth_form.getIsLoad()
  );
  const timer = React.useRef<number>();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  React.useEffect(() => {
    setLoading(APP_STORAGE.auth_form.getIsLoad());
  }, [APP_STORAGE.auth_form.getIsLoad()]);

  const set_sendCode = () => {
    if (APP_STORAGE.auth_form.getLogin() === "") {
      APP_STORAGE.auth_form.setError_login(true);
      APP_STORAGE.auth_form.setLogin_message("Введите логин");
    } else {
      APP_STORAGE.auth_form.setError_login(false);
      APP_STORAGE.auth_form.setLogin_message("");
    }

    if (APP_STORAGE.auth_form.getNewPass().length < 6) {
      APP_STORAGE.auth_form.setErrr_new_pass(true);
      APP_STORAGE.auth_form.setError_new_message(
        "Пароль должен содержать больше 6 символов."
      );
    } else {
      APP_STORAGE.auth_form.setErrr_new_pass(false);
      APP_STORAGE.auth_form.setError_new_message("");
    }

    if (
      APP_STORAGE.auth_form.getLogin().length > 1 &&
      APP_STORAGE.auth_form.getLogin() === APP_STORAGE.auth_form.getNewPass()
    ) {
      APP_STORAGE.auth_form.setErrr_new_pass(true);
      APP_STORAGE.auth_form.setError_new_message(
        "Пароль не должен совпадать с логином"
      );
    }

    if (
      APP_STORAGE.auth_form.getNewPass() !==
      APP_STORAGE.auth_form.getRepeatPass()
    ) {
      APP_STORAGE.auth_form.setError_repeat_pass(true);
      APP_STORAGE.auth_form.setError_repeat_message(
        "Пароли не совпадают. Повторите попытку."
      );
    } else {
      APP_STORAGE.auth_form.setError_repeat_pass(false);
      APP_STORAGE.auth_form.setError_repeat_message("");
    }

    if (
      APP_STORAGE.auth_form.getLogin() !== "" &&
      APP_STORAGE.auth_form.getNewPass() !== "" &&
      APP_STORAGE.auth_form.getRepeatPass() !== ""
    ) {
      APP_STORAGE.auth_form.setIsLoad(true);

      //setLoading(true);
      APP_STORAGE.auth_form.set_SaveNewPass();

      // timer.current = window.setTimeout(
      //   () => {
      //     setLoading(false);
      //   },
      //   1000,
      //   APP_STORAGE.auth_form.set_SaveNewPass()
      // );
    }
  };

  return (
    <Box sx={{}}>
      <Box sx={{ position: "relative" }}></Box>
      <Box sx={{ position: "relative" }}>
        <Button
          fullWidth
          sx={{ mt: "14px", mb: "14px", background: "#266BF1", color: "#fff" }}
          disabled={loading}
          onClick={set_sendCode}
          className="auth_button"
        >
          Подтвердить
        </Button>
        {APP_STORAGE.auth_form.getSuccessSave_mess().length > 0 && (
          <Alert severity="success">
            {APP_STORAGE.auth_form.getSuccessSave_mess()}
          </Alert>
        )}
        {APP_STORAGE.auth_form.getErrorSave_mess().length > 0 && (
          <Alert severity="error">
            {APP_STORAGE.auth_form.getErrorSave_mess()}
          </Alert>
        )}
        {/* {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-1px",
              marginLeft: "-12px",
            }}
          />
        )} */}
      </Box>
    </Box>
  );
});
