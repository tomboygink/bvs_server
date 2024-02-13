import React from "react";

import { observer } from "mobx-react";
import { CONFIG } from "../../xcore/config";
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

import { APP_STORAGE } from "../../client/src/storage/AppStorage";
import { TextInput } from "../../client/src/components/shared/TextInput";
import {
  EMPTY_FIELD_ERROR,
  MATCHING_LOGIN_AND_PASS_ERROR,
  INVALID_PASSWORD_ERROR,
  PASSWORDS_NOT_MATCH,
  regexp_password,
} from "../../client/utils/consts";

interface IProps {}

@observer
export class App extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {}

  componentWillUnmount(): void {}

  async handleSubmit() {
    const isValidPassword = regexp_password.test(
      APP_STORAGE.auth_form.getNewPass()
    );

    if (APP_STORAGE.auth_form.getLogin().trim()) {
      APP_STORAGE.auth_form.setError_login(false);
      APP_STORAGE.auth_form.setLogin_message("");
    } else {
      APP_STORAGE.auth_form.setError_login(true);
      APP_STORAGE.auth_form.setLogin_message(EMPTY_FIELD_ERROR);
    }
    if (APP_STORAGE.auth_form.getNewPass()) {
      if (APP_STORAGE.auth_form.getNewPass().length < 6) {
        APP_STORAGE.auth_form.setErrr_new_pass(true);
        APP_STORAGE.auth_form.setError_new_message(INVALID_PASSWORD_ERROR);
      } else if (!isValidPassword) {
        APP_STORAGE.auth_form.setErrr_new_pass(true);
        APP_STORAGE.auth_form.setError_new_message(INVALID_PASSWORD_ERROR);
      } else if (
        APP_STORAGE.auth_form.getNewPass() !==
        APP_STORAGE.auth_form.getRepeatPass()
      ) {
        APP_STORAGE.auth_form.setError_repeat_pass(true);
        APP_STORAGE.auth_form.setError_repeat_message(PASSWORDS_NOT_MATCH);
        APP_STORAGE.auth_form.setErrr_new_pass(false);
        APP_STORAGE.auth_form.setError_new_message("");
      } else if (
        APP_STORAGE.auth_form.getNewPass() === APP_STORAGE.auth_form.getLogin()
      ) {
        APP_STORAGE.auth_form.setErrr_new_pass(true);
        APP_STORAGE.auth_form.setError_new_message(
          MATCHING_LOGIN_AND_PASS_ERROR
        );
      } else {
        APP_STORAGE.auth_form.setErrr_new_pass(false);
        APP_STORAGE.auth_form.setError_new_message("");
        APP_STORAGE.auth_form.setError_repeat_pass(false);
        APP_STORAGE.auth_form.setError_repeat_message("");
      }
    } else {
      APP_STORAGE.auth_form.setErrr_new_pass(true);
      APP_STORAGE.auth_form.setError_new_message(EMPTY_FIELD_ERROR);
    }
    const isValidValues = () => {
      return (
        !APP_STORAGE.auth_form.getError_login() &&
        !APP_STORAGE.auth_form.getErrr_new_pass() &&
        !APP_STORAGE.auth_form.getError_repeat_pass()
      );
    };

    if (isValidValues()) {
      APP_STORAGE.auth_form.set_SaveNewPass();
    }
  }

  render(): React.ReactNode {
    let splArr = window.location.search.replace(/%20/g, "");
    let splArr1 = splArr.split("=");
    APP_STORAGE.auth_form.setCode(splArr1[1]);

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

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextInput
              label="Логин"
              variant="standard"
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
              error={APP_STORAGE.auth_form.getError_login()}
              helperText={APP_STORAGE.auth_form.getLogin_message()}
              onChange={(e) => {
                APP_STORAGE.auth_form.setLogin(e.target.value);
              }}
            />
            <TextInput
              label="Новый пароль"
              variant="standard"
              InputProps={{ style: { fontSize: 16 }, type: "password" }}
              InputLabelProps={{ style: { fontSize: 16 } }}
              error={APP_STORAGE.auth_form.getErrr_new_pass()}
              helperText={APP_STORAGE.auth_form.getError_new_message()}
              onChange={(e) => {
                APP_STORAGE.auth_form.setNewPass(e.target.value);
              }}
            />

            <TextInput
              label="Повторите пароль"
              variant="standard"
              InputProps={{ style: { fontSize: 16 }, type: "password" }}
              InputLabelProps={{ style: { fontSize: 16 } }}
              error={APP_STORAGE.auth_form.getError_repeat_pass()}
              helperText={APP_STORAGE.auth_form.getError_repeat_message()}
              onChange={(e) => {
                APP_STORAGE.auth_form.setRepeatPass(e.target.value);
              }}
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

            <Button
              onClick={this.handleSubmit}
              fullWidth
              sx={{
                mt: "14px",
                mb: "14px",
                background: "#266BF1",
                color: "#fff",
              }}
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
          </Box>
        </Container>
      </Box>
    );
  }
}
