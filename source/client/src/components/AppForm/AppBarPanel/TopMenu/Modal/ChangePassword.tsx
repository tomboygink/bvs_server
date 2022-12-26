import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {}

//Компонент формы приложения
@observer
export class ChangePassword extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async saveСhanges() {
    APP_STORAGE.modal.set_ChangePass("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    const user = APP_STORAGE.auth_form.user;
    if (APP_STORAGE.modal.getLogin() === "") {
      APP_STORAGE.modal.setLogin(user.login);
    }

    var alert: React.ReactNode = <></>;
    if (APP_STORAGE.modal.getCmdErrPass() === null) {
      alert = (
        <Alert sx={{ mt: "12px" }} severity="success">
          Пароль успешно сохранен.
        </Alert>
      );
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
      alert = (
        <Alert sx={{ mt: "12px" }} severity="error">
          Необходимо проверить правильность введенных данных.
        </Alert>
      );
    }

    return (
      <React.Fragment>
        <form>
          <Box
          //    sx= {{display: 'grid' , gridTemplateColumns: '1fr 8fr', gap: '8px' , alignItems: 'center'}}
          >
            {/* ---------------------------------------смена пароля */}
            <TextField
              inputProps={{ style: { fontSize: 12 } }} // размер текста для text
              InputLabelProps={{ style: { fontSize: 12 } }} // размер текста для label
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={APP_STORAGE.modal.getErrr_old_pass()}
              helperText={APP_STORAGE.modal.getError_old_message()}
              label="Старый пароль"
              autoComplete="старый пароль"
              autoFocus
              size="small"
              type="password"
              onChange={(e) => {
                APP_STORAGE.modal.setOld_Pass(e.target.value);
              }}
              value={APP_STORAGE.modal.getOld_Pass() || ""}
            />

            <TextField
              inputProps={{ style: { fontSize: 12 } }} // размер текста для text
              InputLabelProps={{ style: { fontSize: 12 } }} // размер текста для label
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={APP_STORAGE.modal.getErrr_new_pass()}
              helperText={APP_STORAGE.modal.getError_new_message()}
              label="Новый пароль"
              autoComplete="новый пароль"
              autoFocus
              size="small"
              type="password"
              onChange={(e) => {
                APP_STORAGE.modal.setNew_Pass(e.target.value);
              }}
              value={APP_STORAGE.modal.getNew_Pass() || ""}
            />

            <TextField
              inputProps={{ style: { fontSize: 12 } }} 
              InputLabelProps={{ style: { fontSize: 12 } }} 
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={APP_STORAGE.modal.getError_pass()}
              helperText={APP_STORAGE.modal.getError_message()}
              label="Новый пароль"
              autoComplete="новый пароль"
              autoFocus
              size="small"
              type="password"
              onChange={(e) => {
                APP_STORAGE.modal.setRepeat_password(e.target.value);
              }}
              value={APP_STORAGE.modal.getRepeat_password() || ""}
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
          {alert}
        </form>
      </React.Fragment>
    );
  }
}
