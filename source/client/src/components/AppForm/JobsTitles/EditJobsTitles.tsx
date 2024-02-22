import React from "react";
import { observer } from "mobx-react";

import {
  Box,
  Dialog,
  Divider,
  Typography,
  Alert,
  Button,
  FormHelperText,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { APP_STORAGE } from "../../../storage/AppStorage";
import { CloseButton } from "../../shared/CloseButton";
import { TextInput } from "../../shared/TextInput";

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
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.jobs.getModalEditJobsTitles()}
          fullWidth
          PaperProps={{ sx: { justifyContent: "flex-end" } }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Изменить должность</Typography>
              <CloseButton
                onClose={() => {
                  APP_STORAGE.jobs.setModalEditJobsTitles(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <TextInput
              error={APP_STORAGE.jobs.getErrorTitle()}
              helperText={APP_STORAGE.jobs.getTextHelpTitle()}
              label="Наименование должности"
              onChange={(e) => {
                APP_STORAGE.jobs.setJobsTitles(e.target.value);
              }}
              value={APP_STORAGE.jobs.getJobsTitles() || ""}
            />

            <FormControl
              fullWidth
              size="small"
              sx={{ mt: "14px" }}
              error={APP_STORAGE.jobs.getErrorOrg()}
            >
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
              <FormHelperText>
                {APP_STORAGE.jobs.getTextHelpOrg()}
              </FormHelperText>
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
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
