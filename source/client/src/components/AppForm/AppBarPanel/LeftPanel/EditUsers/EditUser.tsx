import React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  FormHelperText,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  Stack,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AntSwitch } from "../RegistationUsers/switch";
import TelInput from "../../../../shared/TelInput";
import { TextInput } from "../../../../shared/TextInput";

interface IProps {}
@observer
export class EditUser extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.edit_user.setKeyOrg(a);
    APP_STORAGE.edit_user.setKeyJobs(null);
    APP_STORAGE.reg_user.setJobsAll([]);
    APP_STORAGE.edit_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
  }

  async ActivityState(a: any) {
    APP_STORAGE.edit_user.setActive(a);
  }

  async ChangeUser() {
    APP_STORAGE.edit_user.set_ChangeUser(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async SelectedJobs(a: any) {
    APP_STORAGE.edit_user.setKeyJobs(a);
  }

  async ChekedForEdit(editing: any) {
    /// Переключатель (разрешить редактирование)
    APP_STORAGE.edit_user.setCheckboxEd(editing.target.checked);
  }

  async ChekedForRead(readind: any) {
    /// Переключатель (только чтение)
    APP_STORAGE.edit_user.setCheckboxRead(readind.target.checked);
  }

  render(): React.ReactNode {
    let options_org = [];
    let options_jobs = [];
    let org = null;
    let jobs = null;

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
        <Dialog
          className="wrapper_modal"
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.edit_user.getModalEditUser()}
          fullWidth
          PaperProps={{ sx: { justifyContent: "flex-end" } }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Изменить данные пользователя </Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  APP_STORAGE.edit_user.setModalEditUser(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Stack direction="row" spacing={2}>
              <TextInput
                error={APP_STORAGE.edit_user.getErrorFamily()}
                helperText={APP_STORAGE.edit_user.getTextHelpFamily()}
                label="Фамилия"
                onChange={(e) => {
                  APP_STORAGE.edit_user.setFamily(e.target.value);
                }}
                value={APP_STORAGE.edit_user.getFamily() || ""}
              />

              <TextInput
                error={APP_STORAGE.edit_user.getErrorName()}
                helperText={APP_STORAGE.edit_user.getTextHelpName()}
                label="Имя"
                onChange={(e) => {
                  APP_STORAGE.edit_user.setName(e.target.value);
                }}
                value={APP_STORAGE.edit_user.getName() || ""}
              />

              <TextInput
                label="Отчество"
                required={false}
                onChange={(e) => {
                  APP_STORAGE.edit_user.setFather(e.target.value);
                }}
                value={APP_STORAGE.edit_user.getFather() || ""}
              />
            </Stack>

            <Box sx={{ display: "flex" }}>
              <TextInput
                error={APP_STORAGE.edit_user.getErrorEmail()}
                helperText={APP_STORAGE.edit_user.getTextHelpEmail()}
                label="email"
                onChange={(e) => {
                  APP_STORAGE.edit_user.setEmail(e.target.value);
                }}
                value={APP_STORAGE.edit_user.getEmail() || ""}
              />
              <Checkbox
                checked={APP_STORAGE.edit_user.getActMail()}
                id="myCheck"
                color="success"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            <TextInput
              label="Телефон"
              InputProps={{
                inputComponent: TelInput as any,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.edit_user.getErrorTelephone()}
              helperText={APP_STORAGE.edit_user.getTextHelpTelephone()}
              onChange={(e) => {
                APP_STORAGE.edit_user.setTelephone(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getTelephone()}
            />

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Организация
              </InputLabel>

              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.edit_user.getKeyOrg()}
                label="организация"
                onChange={(e) => {
                  this.SelectedOrg(e.target.value);
                }}
              >
                {options_org}
                <Divider />
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel sx={{ fontSize: "12px" }}>Должность</InputLabel>
              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.edit_user.getKeyJobs()}
                label="должность"
                onChange={(e) => {
                  this.SelectedJobs(e.target.value);
                }}
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
                ></Box>
              </Select>
            </FormControl>

            <TextInput
              InputProps={{ style: { fontSize: 12 }, disabled: true }} // font size of input text
              InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
              label="Логин"
              value={APP_STORAGE.edit_user.getLogin() || ""}
            />

            <TextInput
              InputProps={{ style: { fontSize: 12 }, type: "password" }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              error={APP_STORAGE.edit_user.getErrorPassword()}
              helperText={APP_STORAGE.edit_user.getTextHelpPassword()}
              fullWidth
              label="Новый пароль"
              onChange={(e) => {
                APP_STORAGE.edit_user.setPassword(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getPassword() || ""}
            />

            <FormHelperText sx={{ ml: "12px" }}>
              используйте 6 или более символов, сочетая буквы, цифры и символы.
            </FormHelperText>

            <TextInput
              InputProps={{ style: { fontSize: 12 }, type: "password" }} // font size of input text
              error={APP_STORAGE.edit_user.getErrorRepeatPassword()}
              helperText={APP_STORAGE.edit_user.getTextHelpRepeatPassword()}
              label="Повторите пароль"
              onChange={(e) => {
                APP_STORAGE.edit_user.setRepeatPassword(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getRepeatPassword() || ""}
            />

            <Divider sx={{ padding: "12px" }} />

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Активность
              </InputLabel>

              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.edit_user.getActive() || ""}
                label="активность"
                onChange={(e) => {
                  this.ActivityState(e.target.value);
                }}
              >
                <MenuItem key={1} sx={{ fontSize: "12px" }} value={1}>
                  Действующая
                </MenuItem>

                <MenuItem key={2} sx={{ fontSize: "12px" }} value={2}>
                  Закрытая
                </MenuItem>

                <Divider />
              </Select>
            </FormControl>

            <FormGroup sx={{ mt: "12px" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Разрешить редактирование -{" "}
                </Typography>
                <AntSwitch
                  checked={APP_STORAGE.edit_user.getCheckboxEd()}
                  //Закомментировано для запуска
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
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Только чтение -{" "}
                </Typography>
                <AntSwitch
                  checked={APP_STORAGE.edit_user.getCheckboxRead()}
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
                APP_STORAGE.edit_user.setInfo(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getInfo() || ""}
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
                  this.ChangeUser();
                }}
              >
                Сохранить
              </Button>
            </Box>
            {APP_STORAGE.edit_user.getSuccessSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  {APP_STORAGE.edit_user.getSuccessSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.edit_user.getErrorSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.edit_user.getErrorSave_mess()}
                </Alert>
              </Stack>
            )}

            {/* {APP_STORAGE.reg_user.getResulSave().length > 0 && (
              <Typography
                sx={{
                  background: "#EDF7ED",
                  color: "#1E4620",
                  p: "12px",
                  borderRadius: "4px",
                }}
              >
                {" "}
                {APP_STORAGE.reg_user.getResulSave()}
              </Typography>
            )} */}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
