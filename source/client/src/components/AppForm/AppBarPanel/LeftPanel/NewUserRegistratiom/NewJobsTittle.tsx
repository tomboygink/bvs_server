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
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import AddIcon from "@mui/icons-material/Add";

interface IProps {}

@observer
export class NewJobsTittle extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async AddNewUser() {
    APP_STORAGE.reg_user.set_NewUser("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async OpenModalRegUser(e: any, tittle: string) {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
    APP_STORAGE.reg_user.setTakeModal(e);
    APP_STORAGE.reg_user.setTittleModal(tittle);
    APP_STORAGE.reg_user.setModalRegUser(true);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }

  render(): React.ReactNode {
    let org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
    var options: React.ReactNode = <></>;

    return (
      <React.Fragment>
        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel sx={{ fontSize: "12px" }}>Организация</InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyOrg() || ""}
            label="организация"
          >
            <MenuItem
              key={org.idd || ""}
              sx={{ fontSize: "12px" }}
              value={org.idd || ""}
            >
              {org.full_name || ""}
            </MenuItem>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                background: "#F1F5FC",
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
        </FormControl>

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          label="должность"
          autoComplete="должность"
          autoFocus
          size="small"
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
      </React.Fragment>
    );
  }
}
