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
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

interface IProps {}

@observer
export class NewOrganization extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async AddNewOrg() {
    APP_STORAGE.reg_user.set_NewOrg("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            // error ={APP_STORAGE.reg_user.getErrorFamily()}
            // helperText = {APP_STORAGE.reg_user.getTextHelpFamily()}
            label="Полное наименование"
            autoComplete="полное наименование"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setFullNameOrg(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getFullNameOrg() || ""}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            //  error ={APP_STORAGE.reg_user.getErrorName()}
            //  helperText = {APP_STORAGE.reg_user.getTextHelpName()}
            label="Наименование"
            autoComplete="наименование"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setNameOrg(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getNameOrg() || ""}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            //  error ={APP_STORAGE.reg_user.getErrorFather()}
            //  helperText = {APP_STORAGE.reg_user.getTextHelpFather()}
            label="ИНН"
            autoComplete="инн"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setInn(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getInn() || ""}
          />
        </Box>

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          //  error ={APP_STORAGE.reg_user.getErrorEmail()}
          //  helperText = {APP_STORAGE.reg_user.getTextHelpEmail()}
          label="Адрес"
          autoComplete="адрес"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setAddress(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getAddress() || "" }
        />

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          label="Широта"
          autoComplete="широта"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setLatitude(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getLatitude() || ""}
        />

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          label="Долгота"
          autoComplete="долгота"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setLongitude(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getLongitude() || ""}
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
            APP_STORAGE.reg_user.setInfOrg(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getInfOrg() || ""}
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
              this.AddNewOrg();
            }}
          >
            Сохранить
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}
