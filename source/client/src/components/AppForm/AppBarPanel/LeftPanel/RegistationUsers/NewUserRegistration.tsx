import * as React from "react";
import {
  Box,
  Link,
  TextField,
  Button,
  FormHelperText,
  TextareaAutosize,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Alert,
  Input,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "../../../../shared/TextInput";
import TelInput from "../../../../shared/TelInput";
import { AntSwitch } from "./switch";

interface IProps {}

@observer
export class NewUserRegistration extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async AddNewUser() {
    /// сначала получаем всех пользователей для проверки на совпадения логина
    await APP_STORAGE.reg_user.get_AllUsers(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );

    // затем передаем данные с формы на сервер  (ДОБАВЛЯЕМ ПОЛЬЗОВАТЕЛЯ)
    APP_STORAGE.reg_user.set_NewUser("sess_id", APP_STORAGE.auth_form.getdt());
    // setTimeout(() => {
    //   APP_STORAGE.reg_user.set_NewUser(
    //     "sess_id",
    //     APP_STORAGE.auth_form.getdt()
    //   );
    // }, 1000);
  }

  async ChekedForEdit(editing: any) {
    /// Переключатель (разрешить редактирование)
    APP_STORAGE.reg_user.setCheckboxEd(editing.target.checked);
  }

  async ChekedForRead(readind: any) {
    /// Переключатель (только чтение)
    APP_STORAGE.reg_user.setCheckboxRead(readind.target.checked);
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.reg_user.setKeyOrg(a);
    APP_STORAGE.reg_user.setKeyJobs(null);
    APP_STORAGE.reg_user.setJobsAll([]);
    APP_STORAGE.reg_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
  }

  async SelectedJobs(a: any) {
    APP_STORAGE.reg_user.setKeyJobs(a);
  }

  async OpenModalRegUser(e: any, tittle: string) {
    /// Функция для открытия модального окна
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); // как только модальное окно открылось, отправляем запрос на получение всех организаций
    APP_STORAGE.reg_user.setTakeModal(e); // передаем идентифкатор
    APP_STORAGE.reg_user.setTittleModal(tittle); // передаем заголовок в модальное окно
    APP_STORAGE.reg_user.setModalRegUser(true);
    APP_STORAGE.app_bar.setSetOpenAppBar(false); // полсе того , как появилось модальное окно, закрываем меню слева (APP BAR)
  }

  render(): React.ReactNode {
    let org = null;
    let jobs = null;
    var options_org = [];
    var options_jobs = [];
    ///// разделяем обьект на ключ значение - Организации
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(
            /// создаем опции выбора для выпадающего списка - организации
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }
    ///// разделяем обьект на ключ значение - Должности
    if (APP_STORAGE.reg_user.getJobsAll()) {
      jobs = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getJobsAll()));
      for (var key in jobs) {
        if (jobs.hasOwnProperty(key)) {
          let a = jobs[key];

          options_jobs.push(
            /// создаем опции выбора для выпадающего списка - должности
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.name}
            </MenuItem>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <Stack direction="row" spacing={2}>
          <TextInput
            error={APP_STORAGE.reg_user.getErrorFamily()}
            helperText={APP_STORAGE.reg_user.getTextHelpFamily()}
            label="Фамилия"
            onChange={(e) => {
              APP_STORAGE.reg_user.setFamily(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getFamily()}
          />

          <TextInput
            error={APP_STORAGE.reg_user.getErrorName()}
            helperText={APP_STORAGE.reg_user.getTextHelpName()}
            label="Имя"
            onChange={(e) => {
              APP_STORAGE.reg_user.setName(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getName()}
          />

          <TextInput
            required={false}
            error={APP_STORAGE.reg_user.getErrorFather()}
            helperText={APP_STORAGE.reg_user.getTextHelpFather()}
            label="Отчество"
            onChange={(e) => {
              APP_STORAGE.reg_user.setFather(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getFather()}
          />
        </Stack>

        <TextInput
          InputProps={{ style: { fontSize: 12 }, type: "email" }}
          error={APP_STORAGE.reg_user.getErrorEmail()}
          helperText={APP_STORAGE.reg_user.getTextHelpEmail()}
          label="email"
          onChange={(e) => {
            APP_STORAGE.reg_user.setEmail(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getEmail()}
        />

        <TextInput
          label="Телефон"
          InputProps={{
            inputComponent: TelInput as any,
            style: { fontSize: 12 },
          }}
          error={APP_STORAGE.reg_user.getErrorTelephone()}
          helperText={APP_STORAGE.reg_user.getTextHelpTelephone()}
          onChange={(e) => {
            APP_STORAGE.reg_user.setTelephone(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getTelephone()}
        />
        <FormControl
          error={APP_STORAGE.reg_user.getErrorOrg()}
          fullWidth
          size="small"
          sx={{ mt: "14px" }}
        >
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Организация*
          </InputLabel>
          <Select
            required
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyOrg() || ""}
            label="Организация"
            onChange={(e) => {
              this.SelectedOrg(e.target.value);
            }}
          >
            {options_org}
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 1,
                borderRadius: "4px",
              }}
            >
              <MenuItem
                onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
              >
                <AddIcon sx={{ fontSize: "17px", mt: 1, color: "#266BF1" }} />
                <Typography sx={{ fontSize: "12px", mt: 1 }}>
                  Добавить организацию
                </Typography>
              </MenuItem>
            </Box>
          </Select>
          <FormHelperText>
            {APP_STORAGE.reg_user.getTextHelpOrg()}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={APP_STORAGE.reg_user.getErrorJobs()}
          fullWidth
          size="small"
          sx={{ mt: "14px" }}
        >
          <InputLabel sx={{ fontSize: "12px" }}>Должность*</InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyJobs() || ""}
            label="должность"
            onChange={(e) => {
              this.SelectedJobs(e.target.value);
            }}
            required
          >
            {options_jobs}
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 1,
                borderRadius: "4px",
              }}
            >
              <MenuItem
                onClick={() => this.OpenModalRegUser(3, "Добавить должность")}
              >
                <AddIcon sx={{ fontSize: "17px", mt: 1, color: "#266BF1" }} />
                <Typography sx={{ fontSize: "12px", mt: 1 }}>
                  Добавить должность
                </Typography>
              </MenuItem>
            </Box>
          </Select>
          <FormHelperText>
            {APP_STORAGE.reg_user.getTextHelpJobs()}
          </FormHelperText>
        </FormControl>

        <TextInput
          error={
            APP_STORAGE.reg_user.getErrorLogin() ||
            APP_STORAGE.reg_user.getErrorLoginDouble()
          }
          helperText={
            APP_STORAGE.reg_user.getTextHelpLogin() ||
            APP_STORAGE.reg_user.getTextHelpLoginDouble()
          }
          label="Логин"
          onChange={(e) => {
            APP_STORAGE.reg_user.setLogin(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getLogin().trim()}
        />
        <form>
          <TextInput
            InputProps={{ style: { fontSize: 12 }, type: "password" }}
            error={APP_STORAGE.reg_user.getErrorPassword()}
            helperText={APP_STORAGE.reg_user.getTextHelpPassword()}
            label="Пароль"
            onChange={(e) => {
              APP_STORAGE.reg_user.setPassword(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getPassword().trim()}
          />

          <FormHelperText sx={{ ml: "12px" }}>
            используйте 6 или более символов, сочетая буквы, цифры и символы.
          </FormHelperText>

          <TextInput
            InputProps={{ style: { fontSize: 12 }, type: "password" }}
            error={APP_STORAGE.reg_user.getErrorRepeatPassword()}
            helperText={APP_STORAGE.reg_user.getTextHelpRepeatPassword()}
            label="Повторите пароль"
            onChange={(e) => {
              APP_STORAGE.reg_user.setRepeatPassword(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getRepeatPassword().trim()}
          />
        </form>
        <Divider sx={{ padding: "12px" }} />

        <FormGroup sx={{ mt: "12px" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}>
              Разрешить редактирование -{" "}
            </Typography>
            <AntSwitch
              checked={APP_STORAGE.reg_user.getCheckboxEd()}
              // Закомментировано для запуска
              onChange={(editing) => {
                this.ChekedForEdit(editing);
              }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1, mb: 1 }}
          >
            <Typography sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}>
              Только чтение -{" "}
            </Typography>
            <AntSwitch
              checked={APP_STORAGE.reg_user.getCheckboxRead()}
              // Закомментировано для запуска
              onChange={(readind) => {
                this.ChekedForRead(readind);
              }}
            />
          </Stack>
        </FormGroup>

        <Typography sx={{ color: "#999999" }} variant="caption">
          Информация:
        </Typography>

        <TextareaAutosize
          className="info"
          aria-label="minimum height"
          minRows={4}
          style={{ width: "100%" }}
          onChange={(e) => {
            APP_STORAGE.reg_user.setInfo(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getInfo() || ""}
        />

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
              this.AddNewUser();
            }}
          >
            Сохранить
          </Button>
        </Box>
        {APP_STORAGE.reg_user.getSuccessSave_mess().length > 0 && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              {APP_STORAGE.reg_user.getSuccessSave_mess()}
            </Alert>
          </Stack>
        )}
        {APP_STORAGE.reg_user.getErrorSave_mess().length > 0 && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              {APP_STORAGE.reg_user.getErrorSave_mess()}
            </Alert>
          </Stack>
        )}
      </React.Fragment>
    );
  }
}
