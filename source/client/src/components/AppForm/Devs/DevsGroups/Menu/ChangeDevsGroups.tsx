import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  TextareaAutosize,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormGroup,
  Stack,
} from "@mui/material";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import LatInput from "../../../../shared/LatInput";
import LongInput from "../../../../shared/LongInput";
import { TextInput } from "../../../../shared/TextInput";
import { CloseButton } from "../../../../shared/CloseButton";
import { AntSwitch } from "../../../AppBarPanel/LeftPanel/RegistationUsers/switch";

interface IProps {}

//Компонент формы приложения
@observer
export class ChangeDevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModalChDevsGr(false);
    //APP_STORAGE.devs_groups.setName("");
    APP_STORAGE.devs_groups.setNameError(false);
    APP_STORAGE.devs_groups.setNameError_mess("");
    //APP_STORAGE.devs_groups.setLongitude("");
    APP_STORAGE.devs_groups.setLongitudeError(false);
    APP_STORAGE.devs_groups.setLongitudeError_mess("");
    //APP_STORAGE.devs_groups.setLatitude("");
    APP_STORAGE.devs_groups.setLatitudeError(false);
    APP_STORAGE.devs_groups.setLatitudeError_mess("");
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async ChangeDevsGroups() {
    APP_STORAGE.devs_groups.set_ChangeDevsGroups(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async ChekedForEdit(editing: any) {
    APP_STORAGE.devs_groups.setCheckboxEd(editing.target.checked);
  }

  async SaveChangeDevsGroups() {
    APP_STORAGE.devs_groups.set_ChangeDevsGroups(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
    setTimeout(() => {
      APP_STORAGE.devs_groups.get_DevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }, 500);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];
          options_org.push(
            /// создаем опции выбора для выпадающего списка - организации
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id || ""}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.devs_groups.getOpenModalChDevsGr()}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography>Редактировать расположение</Typography>
              <CloseButton
                onClose={() => {
                  this.closeModal();
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            <TextInput
              error={APP_STORAGE.devs_groups.getNameError()}
              helperText={APP_STORAGE.devs_groups.getNameError_mess()}
              label="Место расположения"
              onBlur={(e) => {
                APP_STORAGE.devs_groups.setName(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs_groups.getName() || ""}
            />

            <FormControl
              fullWidth
              size="small"
              sx={{ mt: "14px" }}
              error={APP_STORAGE.devs_groups.getOrgError()}
            >
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Организация
              </InputLabel>
              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.devs_groups.getKeyOrg() || ""}
                label="организация"
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
                ></Box>
              </Select>
            </FormControl>

            <TextInput
              InputProps={{
                inputComponent: LongInput as any,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.devs_groups.getLongitudeError()}
              helperText={APP_STORAGE.devs_groups.getLongitudeError_mess()}
              label="Долгота"
              onBlur={(e) => {
                APP_STORAGE.devs_groups.setLongitude(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs_groups.getLongitude() || ""}
            />

            <TextInput
              InputProps={{
                inputComponent: LatInput as any,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.devs_groups.getLatitudeError()}
              helperText={APP_STORAGE.devs_groups.getLatitudeError_mess()}
              label="Широта"
              onBlur={(e) => {
                APP_STORAGE.devs_groups.setLatitude(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs_groups.getLatitude() || ""}
            />
            <Divider sx={{ padding: "12px" }} />
            <Typography sx={{ color: "#999999" }} variant="caption">
              Информация:
            </Typography>

            <TextareaAutosize
              className="info"
              aria-label="minimum height"
              minRows={4}
              style={{ width: "100%" }}
              onBlur={(e) => {
                APP_STORAGE.devs_groups.setInfo(e.target.value);
              }}
              defaultValue={APP_STORAGE.devs_groups.getInfo() || ""}
            />

            <FormGroup sx={{ mt: "12px" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Заблокировать -{" "}
                </Typography>
                <AntSwitch
                  checked={APP_STORAGE.devs_groups.getCheckboxEd()}
                  // Закомментировано для запуска
                  onChange={(editing) => {
                    this.ChekedForEdit(editing);
                  }}
                />
              </Stack>
            </FormGroup>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                this.SaveChangeDevsGroups();
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
              >
                Сохранить
              </Button>
            </Box>
            {APP_STORAGE.devs_groups.getSuccessSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  {APP_STORAGE.devs_groups.getSuccessSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.devs_groups.getErrorSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.devs_groups.getErrorSave_mess()}
                </Alert>
              </Stack>
            )}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
