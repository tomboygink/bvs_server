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
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface IProps {}

type State = {
  showPassword: boolean; // like this
};

//Компонент формы авторизации
@observer
export class AuthForm extends React.Component<IProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  async handleClickShowPassword() {
    this.state.showPassword
      ? this.setState({ showPassword: false })
      : this.setState({ showPassword: true });
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
            sx={{ padding: "20px", alignSelf: "center" }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "19px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "#266BF1", fontSize: "26px" }}
              >
                Авторизация
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "12px", color: "#198cdf" }}>
              Пожалуйста, введите ваш логин и пароль.
            </Typography>

            <Box component="form">
              <FilledInput
                onChange={(e) => {
                  APP_STORAGE.auth_form.setLogin(e.target.value);
                }}
                value={APP_STORAGE.auth_form.getLogin()}
                placeholder="Введите логин*"
                sx={{ background: "#fff", mt: "8px" }}
                fullWidth
                type="text"
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                }
              />

              <FilledInput
                onChange={(e) => {
                  APP_STORAGE.auth_form.setPassword(e.target.value);
                }}
                value={APP_STORAGE.auth_form.getPassword()}
                placeholder="Введите пароль"
                sx={{ background: "#fff", mt: "8px" }}
                fullWidth
                type={this.state.showPassword ? "text" : "password"}
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => this.handleClickShowPassword()}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                }
              />

              {/* <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px'}} */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  href="#logh"
                  variant="body2"
                  onClick={() => {
                    APP_STORAGE.auth_form.setForgotPass(true);
                  }}
                >
                  Забыли пароль?
                </Link>
                <Button
                  sx={{
                    background: "#266BF1",
                    color: "#fff",
                    mt: "12px",
                    p: "8px",
                  }}
                  type="button"
                  onClick={() => {
                    APP_STORAGE.auth_form.get_UserByAuth();
                  }}
                  className="auth_button"
                >
                  Войти
                </Button>
              </Box>
            </Box>
            {error_alert}
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
