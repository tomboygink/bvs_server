import React from "react";
import { observer } from "mobx-react";

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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

          <Typography sx= {{fontSize: '22px', fontWeight: '500', pb: '18px'}}>
           Проверьте свою электронную почту
          </Typography>
          <Box> 
          <Typography>
          Для продолжения работы необходимо подтвердите свою учетную запись.
          Код подтверждения отправлен на адрес <Typography sx={{fontWeight: '500'}}> «{APP_STORAGE.modal.getEmail()}» .</Typography> Если вы не получили письмо, пожалуйста, проверьте папку со спамом.
          </Typography>
          </Box>
          {/* <Typography sx={{ fontSize: "12px", color: "#1976d2" }}>
            Перед повторной отправкой кода убедитесь, что почта введена
            корректно
          </Typography> */}
             
            {/* <EmailOutlinedIcon/>  */}
<Box sx={{display:'flex', justifyContent: 'center', pt: 5, pb: 5}}> 
            <svg width="64" height="51" viewBox="0 0 64 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0347222 3.5604C0.0347222 1.59405 1.6266 0 3.59028 0H60.4444C62.4081 0 64 1.59405 64 3.5604V43.8792C64 47.8119 60.8163 51 56.8889 51H7.11111C3.18375 51 0 47.8119 0 43.8792V4.71475C0 4.54521 0.0118349 4.37843 0.0347222 4.2152V3.5604ZM7.11111 11.4779V43.8792H56.8889V11.4791L39.5431 28.8485C35.3775 33.0198 28.6237 33.0198 24.4581 28.8485L7.11111 11.4779ZM12.7016 7.00563H51.2996L34.5148 23.8134C33.1262 25.2038 30.875 25.2038 29.4865 23.8134L12.7016 7.00563Z" fill="#E6EAF1"/>
</svg>
</Box>


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

    else {
        form_code = (
          <>
          <Typography sx= {{fontSize: '22px', fontWeight: '500', pb: '18px'}}>
           Успешно сохранено
         </Typography>

<Box sx={{display:'flex', justifyContent: 'center', pt: 5, pb: 5}}> 
<svg width="100" height="69" viewBox="0 0 100 69" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M65.9962 0H0V10.9868H65.9962V0Z" fill="#E6EAF1"/>
<path d="M65.9962 21.9735H0V32.9603H65.9962V21.9735Z" fill="#E6EAF1"/>
<path d="M0 43.9471H43.9975V54.9338H0V43.9471Z" fill="#E6EAF1"/>
<path d="M49.4448 49.578L57.2239 41.8077L68.8891 53.4624L92.2223 30.1559L100 37.9247L68.8891 69L49.4448 49.578Z" fill="#E6EAF1"/>
</svg>
</Box>
</>
        ) 
    }

    return (
      <React.Fragment>
        {/* <Box>Данные успешно изменены.</Box> */}

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
        <Divider light sx={{pb: 1}} />
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
