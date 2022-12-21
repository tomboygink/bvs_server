import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Alert,
  Link,
  FormHelperText,
} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {}

//Компонент формы приложения
@observer
export class Saveresult extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async RepeatSetCode() {
    APP_STORAGE.modal.set_ActMail("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async closeModal() {
    APP_STORAGE.modal.setPersonalAccaunt(false);
    APP_STORAGE.modal.setErrr_old_pass(false);
    APP_STORAGE.modal.setError_old_message("");
    APP_STORAGE.modal.setError_pass(false);
    APP_STORAGE.modal.setError_message("");
    APP_STORAGE.modal.setCmdErrData("");
    let user = APP_STORAGE.auth_form.getUser();
    if (APP_STORAGE.modal.getFamily() !== "") {
      APP_STORAGE.modal.setFamily(user.family);
    }

    if (APP_STORAGE.modal.getName() !== "") {
      APP_STORAGE.modal.setName(user.name);
    }

    if (APP_STORAGE.modal.getFather() !== "") {
      APP_STORAGE.modal.setFather(user.father);
    }

    if (APP_STORAGE.modal.getTelephone() !== "") {
      APP_STORAGE.modal.setTelephone(user.telephone);
    }

    if (APP_STORAGE.modal.getEmail() !== "") {
      APP_STORAGE.modal.setEmail(user.email);
    }

    if (APP_STORAGE.modal.getLogin() !== "") {
      APP_STORAGE.modal.setLogin(user.login);
    }

    if (APP_STORAGE.modal.getOld_Pass() !== "") {
      APP_STORAGE.modal.setOld_Pass("");
    }

    if (APP_STORAGE.modal.getNew_Pass() !== "") {
      APP_STORAGE.modal.setNew_Pass("");
    }

    if (APP_STORAGE.modal.getRepeat_password() !== "") {
      APP_STORAGE.modal.setRepeat_password("");
    }
  }

  async ChangeCUserData() {
    APP_STORAGE.modal.setModal(1);
    APP_STORAGE.modal.setPersonalAccaunt(true);
    APP_STORAGE.modal.setCmdErrData("");
    APP_STORAGE.modal.setModalTitle("Изменение данных");
  }

  render(): React.ReactNode {
    APP_STORAGE.modal.setActMail(APP_STORAGE.auth_form.getUser().act_mail);

    var form_code: React.ReactNode = <></>;
    var button: React.ReactNode = <></>;
    if (APP_STORAGE.modal.getActMail() === false) {
      form_code = (
        <>
          <Typography>
            Код подтверждения отправлен на {APP_STORAGE.modal.getEmail()} почту
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#1976d2" }}>
            Перед повторной отправкой кода убедитесь, что почта введена
            корректно
          </Typography>
        </>
      );
      button = (
        <>
          <Button
            sx={{
              background: "#F1F5FC",
              color: "#266BF1",
              mt: "18px",
              fontSize: "12px",
            }}
            onClick={() => {
              this.RepeatSetCode();
            }}
          >
            Отправить код еще раз
          </Button>
        </>
      );
    }

    return (
      <React.Fragment>
        <Box>Данные успешно изменены.</Box>

        {form_code}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {button}
          <Button
            sx={{
              background: "#266BF1",
              color: "#fff;",
              mt: "18px",
              ml: "14px",
              fontSize: "12px",
            }}
            onClick={() => {
              this.closeModal();
            }}
          >
            Закрыть
          </Button>
        </Box>

        <Link
          href="#"
          variant="body2"
          onClick={() => {
            this.ChangeCUserData();
          }}
        >
          Продолжить редактирование
        </Link>
      </React.Fragment>
    );
  }
}
