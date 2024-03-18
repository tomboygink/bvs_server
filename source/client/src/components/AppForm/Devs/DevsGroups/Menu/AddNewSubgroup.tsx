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
  Stack,
  Alert,
  FormHelperText,
} from "@mui/material";
import LongInput from "../../../../shared/LongInput";
import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { CloseButton } from "../../../../shared/CloseButton";
import { TextInput } from "../../../../shared/TextInput";
import LatInput from "../../../../shared/LatInput";

interface IProps {}

//Компонент формы приложения
@observer
export class AddNewSubgroup extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async set_NewDevGroup() {
    APP_STORAGE.devs_groups.set_NewDevGroup(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
    APP_STORAGE.devs_groups.setName("");
    APP_STORAGE.devs_groups.setNameError(false);
    APP_STORAGE.devs_groups.setNameError_mess("");
    APP_STORAGE.devs_groups.setOrgError(false);
    APP_STORAGE.devs_groups.setOrgError_mess("");
    APP_STORAGE.devs_groups.setLongitude("");
    APP_STORAGE.devs_groups.setLongitudeError(false);
    APP_STORAGE.devs_groups.setLongitudeError_mess("");
    APP_STORAGE.devs_groups.setLatitude("");
    APP_STORAGE.devs_groups.setLatitudeError(false);
    APP_STORAGE.devs_groups.setLatitudeError_mess("");
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];
    ///// разделяем обьект на ключ значение - Организации
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];
          if (APP_STORAGE.devs_groups.getOrg() === Number(a.id)) {
            options_org.push(
              /// создаем опции выбора для выпадающего списка - организации
              <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
                {a.full_name}
              </MenuItem>
            );
          }

          if (APP_STORAGE.devs_groups.getOrg() === 0) {
            options_org.push(
              /// создаем опции выбора для выпадающего списка - организации
              <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
                {a.full_name}
              </MenuItem>
            );
          }
        }
      }
    }

    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.devs_groups.getOpenModal()}
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
              <Typography>Добавить расположение устройств</Typography>
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
              onChange={(e) => {
                APP_STORAGE.devs_groups.setName(e.target.value);
              }}
              value={APP_STORAGE.devs_groups.getName()}
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
              <FormHelperText>
                {APP_STORAGE.devs_groups.getOrgError_mess()}
              </FormHelperText>
            </FormControl>
            <TextInput
              InputProps={{
                inputComponent: LatInput,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.devs_groups.getLatitudeError()}
              helperText={APP_STORAGE.devs_groups.getLatitudeError_mess()}
              label="Широта"
              onChange={(e) => {
                APP_STORAGE.devs_groups.setLatitude(e.target.value);
              }}
              value={APP_STORAGE.devs_groups.getLatitude()}
            />
            <TextInput
              InputProps={{
                inputComponent: LongInput as any,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.devs_groups.getLongitudeError()}
              helperText={APP_STORAGE.devs_groups.getLongitudeError_mess()}
              label="Долгота"
              onChange={(e) => {
                APP_STORAGE.devs_groups.setLongitude(e.target.value);
              }}
              value={APP_STORAGE.devs_groups.getLongitude()}
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
              onChange={(e) => {
                APP_STORAGE.devs_groups.setInfo(e.target.value);
              }}
              value={APP_STORAGE.devs_groups.getInfo()}
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
                  this.set_NewDevGroup();
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
