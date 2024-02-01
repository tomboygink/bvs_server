import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  Alert,
  Link,
  Button,
  FormHelperText,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import NativeSelect from "@mui/material/NativeSelect";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import { APP_STORAGE } from "../../../storage/AppStorage";

interface IProps {}

@observer
export class EditJobsTitles extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async EditJobs_Titles() {
    APP_STORAGE.jobs.setChangeJobs_Titles(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.jobs.setIdOrg(a);

    // APP_STORAGE.edit_user.setKeyJobs(null);
    // APP_STORAGE.reg_user.setJobsAll([]);
    // APP_STORAGE.edit_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
  }

  render(): React.ReactNode {
    let options_org = [];
    let org = null;

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

    return (
      <React.Fragment>
        <Dialog
          className="wrapper_modal"
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.jobs.getModalEditJobsTitles()}
          fullWidth
          PaperProps={{ sx: { justifyContent: "flex-end" } }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Изменить должность</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  APP_STORAGE.jobs.setModalEditJobsTitles(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <TextField
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              // error={APP_STORAGE.reg_user.getErrorFullName() || APP_STORAGE.reg_user.getErrorFullNameDouble() }
              // helperText={APP_STORAGE.reg_user.getTextHelpFullName() || APP_STORAGE.reg_user.getTextHelpFullNameDouble()}
              label="Наименование должности"
              autoComplete="Наименование должности"
              autoFocus
              size="small"
              onChange={(e) => {
                APP_STORAGE.jobs.setJobsTitles(e.target.value);
              }}
              value={APP_STORAGE.jobs.getJobsTitles() || ""}
            />

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Организация
              </InputLabel>

              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.jobs.getIdOrg()}
                label="организация"
                onChange={(e) => {
                  this.SelectedOrg(e.target.value);
                }}
              >
                {options_org}
                <Divider />
              </Select>
            </FormControl>

            <Divider sx={{ padding: "12px" }} />
            <Typography
              sx={{ color: "#999999" }}
              variant="caption"
            ></Typography>

            <TextareaAutosize
              className="info"
              aria-label="minimum height"
              minRows={4}
              style={{ width: "100%" }}
              onChange={(e) => {
                APP_STORAGE.jobs.setInfo(e.target.value);
              }}
              value={APP_STORAGE.jobs.getInfo() || ""}
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
                  this.EditJobs_Titles();
                }}
              >
                Сохранить
              </Button>
            </Box>
            {APP_STORAGE.edit_user.getSuccessSave_mess().length > 0 && (
              <Alert severity="success">
                {APP_STORAGE.edit_user.getSuccessSave_mess()}
              </Alert>
            )}
            {APP_STORAGE.edit_user.getErrorSave_mess().length > 0 && (
              <Alert severity="error">
                {APP_STORAGE.edit_user.getErrorSave_mess()}
              </Alert>
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
