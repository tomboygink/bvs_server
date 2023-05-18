import React from "react";
import { observer } from "mobx-react";

import { TextField, Box, Dialog, Divider, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


import NativeSelect from "@mui/material/NativeSelect";

import {
  Link,
  Button,
  FormHelperText,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import { APP_STORAGE } from "../../../storage/AppStorage";

interface IProps {}

@observer
export class EditOrg extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async EditOrg() {
    APP_STORAGE.org.set_ChangeOrg("sess_id",APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
   
    return (
      <React.Fragment>
        <Dialog className="wrapper_modal"
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.org.getModalEditOrg()}
          fullWidth
          PaperProps={{ sx: { justifyContent: 'flex-end'} }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
             <Typography>Изменить данные организации </Typography> 

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  APP_STORAGE.org.setModalEditOrg(false);
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
                label="Полное наименование"
                autoComplete="Полное наименование"
                autoFocus
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setFullNameOrg(e.target.value);
                }}
                value={APP_STORAGE.org.getFullNameOrg() || ""}
              />



              <TextField
                inputProps={{ style: { fontSize: 12 } }} 
                InputLabelProps={{ style: { fontSize: 12 } }} 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // error={APP_STORAGE.reg_user.getErrorNameOrg() || APP_STORAGE.reg_user.getErrorNameDouble()}
                // helperText={APP_STORAGE.reg_user.getTextHelpNameDouble()}
                label="Наименование"
                autoComplete="Наименование"
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setNameOrg(e.target.value);
                }}
                value={APP_STORAGE.org.getNameOrg() || ""}
              />



              <TextField
                inputProps={{ style: { fontSize: 12 } }} 
                InputLabelProps={{ style: { fontSize: 12 } }} 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // error={
                //   APP_STORAGE.reg_user.getErrorInn() ||
                //   APP_STORAGE.reg_user.getErrorInnDouble()
                // }
                // helperText={
                //   APP_STORAGE.reg_user.getTextHelpInn() ||
                //   APP_STORAGE.reg_user.getTextHelpInnDouble()
                // }
                label="Инн"
                autoComplete="Инн"
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setInn(e.target.value);
                }}
                value={APP_STORAGE.org.getInn() || ""}
              />

                <TextField
                inputProps={{ style: { fontSize: 12 } }} 
                InputLabelProps={{ style: { fontSize: 12 } }} 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // error={APP_STORAGE.reg_user.getErrorAddress()}
                // helperText={APP_STORAGE.reg_user.getTextHelpAddress()}
                label="Адрес"
                autoComplete="Адрес"
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setAddress(e.target.value);
                }}
                value={APP_STORAGE.org.getAddress() || ""}
                />

                <TextField
                inputProps={{ style: { fontSize: 12 } }} 
                InputLabelProps={{ style: { fontSize: 12 } }} 
                variant="outlined"
                margin="normal"
                required
                fullWidth

                label="Широта"
                autoComplete="Широта"
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setLatitude(e.target.value);
                }}
                value={APP_STORAGE.org.getLatitude() || ""}
                />

                <TextField
                inputProps={{ style: { fontSize: 12 } }} 
                InputLabelProps={{ style: { fontSize: 12 } }} 
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Долгота"
                autoComplete="Долгота"
                size="small"
                onChange={(e) => {
                  APP_STORAGE.org.setLongitude(e.target.value);
                }}
                value={APP_STORAGE.org.getLongitude() || ""}
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
                APP_STORAGE.org.setInfOrg(e.target.value);
              }}
              value={APP_STORAGE.org.getInfOrg() || ""}
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
              this.EditOrg();
            }}
          >
            Сохранить
          </Button>
        </Box>
        {APP_STORAGE.reg_user.getResulSave().length > 0 && (
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
            )}
      
          </Box>

       
        </Dialog>
      </React.Fragment>
    );
  }
}
