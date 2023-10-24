import React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../storage/AppStorage";

import {
  Button,
  TextField,
  Box,
  Container,
  CssBaseline,
  Typography,
  Alert,
  Link
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface IProps {}

const theme = createTheme();
//Если пользователь забыл пароль
@observer
export class ForgotPass extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    var alert: React.ReactNode = <></>;
    if (APP_STORAGE.auth_form.get_forgPass() === null) {
      alert = (
        <Alert severity="success">
          Код подтверждения отправлен на электронную почту
        </Alert>
      );
    } else if (
      APP_STORAGE.auth_form.get_forgPass() !== null &&
      APP_STORAGE.auth_form.get_forgPass() !== ""
    ) {
      alert = (
        <Alert severity="error">{APP_STORAGE.auth_form.get_forgPass()}</Alert>
      );
    }

    if (APP_STORAGE.auth_form.getError_emain() === true) {
      alert = <></>;
    }

    return (
      <React.Fragment>
        <Box className="auth-form">
          <Container
            component="main"
            maxWidth="xs"
            sx={{ padding: "20px", mt: "5%", alignSelf: "center" }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
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
                  APP_STORAGE.auth_form.setForgotPass(false);
                }}
              />
            </Box>

            <Typography sx={{ fontSize: "12px", color: "grey" }}>
              Забыли пароль? Пожалуйста, введите ваш email . Вы получите код
              подтверждения по электронной почте.
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                variant="standard"
                margin="normal"
                required
                error={APP_STORAGE.auth_form.getError_emain()}
                helperText={APP_STORAGE.auth_form.getEmail_message()}
                fullWidth
                label="email"
                name="email"
                autoComplete="email"
                onChange={e => {
                  APP_STORAGE.auth_form.setEmail(e.target.value);
                }}
                value={APP_STORAGE.auth_form.getEmail()}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  APP_STORAGE.auth_form.setForgotPass(false);
                }}
              >
                Вернуться на форму авторизации
              </Link>
              <Button
                sx={{
                  background: "#266BF1",
                  color: "#fff",
                  mt: "12px",
                  p: "8px"
                }}
                type="button"
                onClick={() => {
                  APP_STORAGE.auth_form.set_ForgPass();
                }}
                className="auth_button"
              >
                Получить код
              </Button>
            </Box>
            {alert}
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}
