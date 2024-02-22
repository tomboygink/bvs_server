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
  Alert,
  Stack,
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "../../../../shared/TextInput";

interface IProps {}

@observer
export class NewJobsTittle extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async AddNewJobTitle() {
    APP_STORAGE.reg_user.set_NewJobTitle(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.reg_user.setKeyOrg(a);
    APP_STORAGE.reg_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
  }

  async OpenModalRegUser(e: any, tittle: string) {
    ///APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
    APP_STORAGE.reg_user.setTakeModal(e);
    APP_STORAGE.reg_user.setTittleModal(tittle);
    APP_STORAGE.reg_user.setModalRegUser(true);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }

  render(): React.ReactNode {
    let org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));

    var options_org = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <FormControl
          fullWidth
          size="small"
          sx={{ mt: "14px" }}
          error={APP_STORAGE.reg_user.getErrorOrg()}
        >
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Организация*
          </InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyOrg() || ""}
            label="организация"
            autoFocus
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

        <TextInput
          error={APP_STORAGE.reg_user.getErrorJobs()}
          helperText={APP_STORAGE.reg_user.getTextHelpJobs()}
          label="Должность"
          onChange={(e) => {
            APP_STORAGE.reg_user.setNewJobsTitles(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getNewJobsTitles()}
        />

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
              this.AddNewJobTitle();
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
