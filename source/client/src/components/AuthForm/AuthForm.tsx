import React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../storage/AppStorage";

import {
  Avatar,
  Button,
  TextField,
  Box,
  Container,
  CssBaseline,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface IProps {}

const theme = createTheme();
//Компонент формы авторизации
@observer
export class AuthForm extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    var error_alert: React.ReactNode = <></>;
    if (APP_STORAGE.auth_form.getCmderror() !== null) {
      error_alert = (
        <Alert icon={false} sx={{ marginTop: 2 }} severity="error">
          {APP_STORAGE.auth_form.getCmderror()}
        </Alert>
      );
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "#266BF1", fontSize: "36px" }}
              >
                Авторизация
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "12px", color: "grey" }}>
              Пожалуйста, введите ваш логин и пароль.
            </Typography>

            <Box component="form">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus
                onChange={(e) => {
                  APP_STORAGE.auth_form.setLogin(e.target.value);
                }}
                value={APP_STORAGE.auth_form.getLogin()}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  APP_STORAGE.auth_form.setPassword(e.target.value);
                }}
                value={APP_STORAGE.auth_form.getPassword()}
              />

              {/* <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px'}} */}
              <Button
                sx={{
                  background: "#266BF1",
                  color: "#fff",
                  mt: "12px",
                  p: "8px",
                }}
                type="button"
                fullWidth
                onClick={() => {
                  APP_STORAGE.auth_form.get_UserByAuth();
                }}
                className="auth_button"
              >
                Войти
              </Button>
              {error_alert}
            </Box>
            <Grid container sx={{ mt: "12px" }}>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  APP_STORAGE.auth_form.setForgotPass(true);
                }}
              >
                Забыли пароль?
              </Link>
              <Grid item></Grid>
            </Grid>
          </Container>
          {/*  
                 <Box className='right-panel'>

                    <Typography> Добро пожаловать на сервер приема данных СБИ</Typography>
                    
                    <Typography sx ={{mb: '12px'}}>© ООО Севербуринструмент 
                    | e-mail: severburinstrument@mail.ru</Typography>
                 </Box> */}
        </Box>
      </React.Fragment>
    );
  }
}
