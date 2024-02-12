import React, { FC } from "react";
import { APP_STORAGE } from "../../../../source/client/src/storage/AppStorage";
import {
  Button,
  TextField,
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Alert,
  Link,
  Stack,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { CircularIntegration } from "./reload";
import { CONFIG } from "../../../xcore/config";
import { observer } from "mobx-react";

interface IProps {}

export const ForgotPass: FC<IProps> = observer(() => {
  let splArr = window.location.search.replace(/%20/g, "");
  let splArr1 = splArr.split("=");
  React.useEffect(() => {
    APP_STORAGE.auth_form.setCode(splArr1[1]);
  }, []);

  return (
    <Box className="auth-form">
      <Container
        component="main"
        maxWidth="xs"
        sx={{ padding: "20px", mt: "5%", alignSelf: "center" }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#266BF1", fontSize: "36px" }}
          >
            Сброс пароля
          </Typography>
          <ArrowRightAltIcon
            sx={{ color: "#1976D2" }}
            onClick={() => {
              window.location.href = `http://${CONFIG.host}:${CONFIG.port}`;
            }}
          />
        </Box>

        <Typography sx={{ fontSize: "12px", color: "grey" }}>
          Для сброса пароля , пожалуйста, укажите ваш логин и новый пароль.{" "}
        </Typography>
        {/* <Typography sx={{ fontSize: "12px", color: "#1976d2" }}>
          (код подтверждения - введен автоматически)
        </Typography> */}

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            error={APP_STORAGE.auth_form.getError_login()}
            helperText={APP_STORAGE.auth_form.getLogin_message()}
            label="Логин"
            name="login"
            autoFocus
            onChange={(e) => {
              APP_STORAGE.auth_form.setLogin(e.target.value);
            }}
            value={APP_STORAGE.auth_form.getLogin() || ""}
          />

          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            error={APP_STORAGE.auth_form.getErrr_new_pass()}
            helperText={APP_STORAGE.auth_form.getError_new_message()}
            label="Новый пароль"
            type="password"
            onChange={(e) => {
              APP_STORAGE.auth_form.setNewPass(e.target.value);
            }}
            value={APP_STORAGE.auth_form.getNewPass() || ""}
          />

          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            error={APP_STORAGE.auth_form.getError_repeat_pass()}
            helperText={APP_STORAGE.auth_form.getError_repeat_message()}
            name="password"
            label="Повторите пароль"
            type="password"
            onChange={(e) => {
              APP_STORAGE.auth_form.setRepeatPass(e.target.value);
            }}
            value={APP_STORAGE.auth_form.getRepeatPass() || ""}
          />

          <TextField
            InputProps={{ type: "hidden" }}
            sx={{ display: "none" }}
            variant="standard"
            fullWidth
            disabled={true}
            margin="normal"
            label="Код подтверждения"
            id="outlined-size-small"
            error={APP_STORAGE.auth_form.getError_code()}
            helperText={APP_STORAGE.auth_form.getError_code_mess()}
            onChange={(e) => {
              APP_STORAGE.auth_form.setCode(e.target.value);
            }}
            // value={APP_STORAGE.auth_form.getCode() || ""}
          />

          <CircularIntegration />
        </Box>
      </Container>
    </Box>
  );
});
