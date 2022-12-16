import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Button,
  Divider,
  Typography,
  Checkbox,
  Alert,
  FormHelperText,
} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SaveIcon from "@mui/icons-material/Save";

import { Route } from "react-router-dom";

interface IProps {}

@observer
export class ChangeUserData extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async saveСhanges() {
    APP_STORAGE.modal.set_CUserData("sess_id", APP_STORAGE.auth_form.getdt());
  }

  componentDidMount(): void {
    let user = APP_STORAGE.auth_form.getUser();
    if (APP_STORAGE.modal.getFamily() === "") {
      APP_STORAGE.modal.setFamily(user.family);
    }

    if (APP_STORAGE.modal.getName() === "") {
      APP_STORAGE.modal.setName(user.name);
    }

    if (APP_STORAGE.modal.getFather() === "") {
      APP_STORAGE.modal.setFather(user.father);
    }

    if (APP_STORAGE.modal.getTelephone() === "") {
      APP_STORAGE.modal.setTelephone(user.telephone);
    }

    if (APP_STORAGE.modal.getEmail() === "") {
      APP_STORAGE.modal.setEmail(user.email);
    }

    if (APP_STORAGE.modal.getLogin() === "") {
      APP_STORAGE.modal.setLogin(user.login);
    }
  }

  render(): React.ReactNode {
    APP_STORAGE.modal.setActMail(APP_STORAGE.auth_form.getUser().act_mail);

    return (
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            label="Фамилия"
            autoComplete="фамилия"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.modal.setFamily(e.target.value);
            }}
            value={APP_STORAGE.modal.getFamily() || ""}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            label="Имя"
            autoComplete="имя"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.modal.setName(e.target.value);
            }}
            value={APP_STORAGE.modal.getName() || ""}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            label="Отчество"
            autoComplete="отчество"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.modal.setFather(e.target.value);
            }}
            value={APP_STORAGE.modal.getFather() || ""}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{ mt: "12px" }}
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            fullWidth
            required
            error={APP_STORAGE.modal.getError_emain()}
            helperText={
              APP_STORAGE.modal.getEmail_message() ||
              APP_STORAGE.modal.getCmdErrData()
            }
            label="email"
            autoComplete="email"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.modal.setEmail(e.target.value);
            }}
            value={APP_STORAGE.modal.getEmail() || ""}
          />
          <Checkbox
            checked={APP_STORAGE.auth_form.getUser().act_mail}
            id="myCheck"
            color="success"
            //onChange = { () => {this.confirmEmail}}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>

        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          error={APP_STORAGE.modal.getError_phone()}
          helperText={APP_STORAGE.modal.getPhone_message()}
          label="Телефон"
          autoComplete="телефон"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.modal.setTelephone(e.target.value);
          }}
          value={APP_STORAGE.modal.getTelephone()}
        />
        <FormHelperText sx={{ ml: "12px" }}>
          номер телефона должен содержать 10 символов.
        </FormHelperText>

        <Box>
          <Box
            className="wrapper"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 8fr",
              gap: "8px",
              alignItems: "center",
            }}
          >
          </Box>

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
              APP_STORAGE.modal.setInfo(e.target.value);
            }}
            value={APP_STORAGE.modal.getInfo() || ""}
          />
        </Box>

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
              this.saveСhanges();
            }}
          >
            Сохранить
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}
