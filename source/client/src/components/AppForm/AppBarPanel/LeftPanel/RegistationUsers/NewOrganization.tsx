import * as React from "react";
import {
  Box,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Divider,
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { Padding } from "@mui/icons-material";

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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            error={APP_STORAGE.reg_user.getErrorFullName() || APP_STORAGE.reg_user.getErrorFullNameDouble() }
            helperText={APP_STORAGE.reg_user.getTextHelpFullName() || APP_STORAGE.reg_user.getTextHelpFullNameDouble()}
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
            error={APP_STORAGE.reg_user.getErrorNameOrg() || APP_STORAGE.reg_user.getErrorNameDouble()}
            helperText={APP_STORAGE.reg_user.getTextHelpNameDouble()}
            label="Наименование"
            autoComplete="наименование"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setNameOrg(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getNameOrg() || ""}
          />
        </Box>

        <TextField
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          margin="normal"
          required
          error={
            APP_STORAGE.reg_user.getErrorInn() ||
            APP_STORAGE.reg_user.getErrorInnDouble()
          }
          helperText={
            APP_STORAGE.reg_user.getTextHelpInn() ||
            APP_STORAGE.reg_user.getTextHelpInnDouble()
          }
          label="ИНН"
          autoComplete="инн"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setInn(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getInn() || ""}
        />

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          error={APP_STORAGE.reg_user.getErrorAddress()}
          helperText={APP_STORAGE.reg_user.getTextHelpAddress()}
          label="Адрес"
          autoComplete="адрес"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setAddress(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getAddress() || ""}
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
        {APP_STORAGE.reg_user.getResulSave().length > 0 &&
       <Typography sx= {{background: '#EDF7ED', color : '#1E4620', p: '12px', borderRadius: '4px'}}> {APP_STORAGE.reg_user.getResulSave()}</Typography>
      }
      </React.Fragment>
    );
  }
}
