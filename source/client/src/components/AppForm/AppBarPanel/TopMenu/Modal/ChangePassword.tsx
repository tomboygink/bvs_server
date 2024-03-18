import React from "react";
import { observer } from "mobx-react";

import { Box, Button, Alert, InputAdornment } from "@mui/material";
import { APP_STORAGE } from "../../../../../storage/AppStorage";

import { TextInput } from "../../../../shared/TextInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IProps {}

type State = {
  showOldPassword: boolean;
  showNewPassword: boolean;
  showRepeatPassword: boolean;
};

//Компонент формы приложени  я
@observer
export class ChangePassword extends React.Component<IProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showOldPassword: false,
      showNewPassword: false,
      showRepeatPassword: false,
    };
  }

  handleClickShowOldPassword() {
    this.state.showOldPassword
      ? this.setState({ showOldPassword: false })
      : this.setState({ showOldPassword: true });
  }

  handleClickShowNewPassword() {
    this.state.showNewPassword
      ? this.setState({ showNewPassword: false })
      : this.setState({ showNewPassword: true });
  }

  handleClickShowRepeatPassword() {
    this.state.showRepeatPassword
      ? this.setState({ showRepeatPassword: false })
      : this.setState({ showRepeatPassword: true });
  }

  async saveСhanges() {
    APP_STORAGE.modal.set_ChangePass("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    const user = APP_STORAGE.auth_form.user;

    if (APP_STORAGE.modal.getLogin() === "") {
      APP_STORAGE.modal.setLogin(user.login);
    }

    if (APP_STORAGE.modal.getCmdErrPass() === null) {
      setTimeout(() => {
        APP_STORAGE.modal.setPersonalAccaunt(false);
        APP_STORAGE.modal.setOld_Pass(""),
          APP_STORAGE.modal.setNew_Pass(""),
          APP_STORAGE.modal.setRepeat_password("");
        APP_STORAGE.modal.setCmdErrPass("");
      }, 2000);
    } else if (
      APP_STORAGE.modal.getCmdErrPass() !== null &&
      APP_STORAGE.modal.getCmdErrPass() !== ""
    ) {
    }

    return (
      <React.Fragment>
        <form>
          <Box>
            {/* ---------------------------------------смена пароля */}

            <TextInput
              label="Старый пароль"
              error={APP_STORAGE.modal.getErrr_old_pass()}
              helperText={APP_STORAGE.modal.getError_old_message()}
              onChange={(e) => {
                APP_STORAGE.modal.setOld_Pass(e.target.value);
              }}
              value={APP_STORAGE.modal.getOld_Pass().trim() || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => this.handleClickShowOldPassword()}
                      edge="end"
                    >
                      {this.state.showOldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontSize: 12 },
                type: this.state.showOldPassword ? "text" : "password",
              }}
            />

            <TextInput
              label="Новый пароль"
              error={APP_STORAGE.modal.getErrr_new_pass()}
              helperText={APP_STORAGE.modal.getError_new_message()}
              onChange={(e) => {
                APP_STORAGE.modal.setNew_Pass(e.target.value);
              }}
              value={APP_STORAGE.modal.getNew_Pass().trim() || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => this.handleClickShowNewPassword()}
                      edge="end"
                    >
                      {this.state.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontSize: 12 },
                type: this.state.showNewPassword ? "text" : "password",
              }}
            />
            <TextInput
              label="Повторите пароль"
              error={APP_STORAGE.modal.getError_pass()}
              helperText={APP_STORAGE.modal.getError_message()}
              onChange={(e) => {
                APP_STORAGE.modal.setRepeat_password(e.target.value);
              }}
              value={APP_STORAGE.modal.getRepeat_password().trim() || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => this.handleClickShowRepeatPassword()}
                      edge="end"
                    >
                      {this.state.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontSize: 12 },
                type: this.state.showRepeatPassword ? "text" : "password",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                background: "#266BF1",
                color: "#fff;",
                mt: "18px",
                mb: "18px",
                fontSize: "12px",
              }}
              onClick={() => {
                this.saveСhanges();
              }}
            >
              Сохранить
            </Button>
          </Box>
          {APP_STORAGE.modal.getSuccessSave_mess().length > 0 && (
            <Alert severity="success">
              {APP_STORAGE.modal.getSuccessSave_mess()}
            </Alert>
          )}
          {APP_STORAGE.shared_store.getErrorResponseMess().length > 0 && (
            <Alert severity="error">
              {APP_STORAGE.shared_store.getErrorResponseMess()}
            </Alert>
          )}
          {APP_STORAGE.modal.getErrorSave_mess().length > 0 && (
            <Alert severity="error">
              {APP_STORAGE.modal.getErrorSave_mess()}
            </Alert>
          )}
          {/* {alert} */}
        </form>
      </React.Fragment>
    );
  }
}
