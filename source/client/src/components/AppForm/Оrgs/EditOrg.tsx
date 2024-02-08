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
  Stack,
  Alert,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";

import { APP_STORAGE } from "../../../storage/AppStorage";
import IdInput from "../../shared/IdInput";
import LatInput from "../../shared/LatInput";
import LongInput from "../../shared/LongInput";

interface IProps {}

@observer
export class EditOrg extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async EditOrg() {
    APP_STORAGE.org.set_ChangeOrg("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Dialog
          className="wrapper_modal"
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.org.getModalEditOrg()}
          fullWidth
          PaperProps={{ sx: { justifyContent: "flex-end" } }}
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
              error={APP_STORAGE.org.getErrorFullNameOrg()}
              helperText={APP_STORAGE.org.getHelpTextFullNameOrg()}
              label="Полное наименование"
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
              error={APP_STORAGE.org.getErrorNameOrg()}
              helperText={APP_STORAGE.org.getHelpTextNameOrg()}
              label="Наименование"
              size="small"
              onChange={(e) => {
                APP_STORAGE.org.setNameOrg(e.target.value);
              }}
              value={APP_STORAGE.org.getNameOrg() || ""}
            />
            <TextField
              InputProps={{
                inputComponent: IdInput as any,
                style: { fontSize: 12 },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="ИНН"
              size="small"
              error={APP_STORAGE.org.getErrorInn()}
              helperText={APP_STORAGE.org.getHelpTextInn()}
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
              error={APP_STORAGE.org.getErrorAddress()}
              helperText={APP_STORAGE.org.getHelpTextAddress()}
              label="Адрес"
              size="small"
              onChange={(e) => {
                APP_STORAGE.org.setAddress(e.target.value);
              }}
              value={APP_STORAGE.org.getAddress() || ""}
            />

            <TextField
              InputProps={{
                inputComponent: LatInput as any,
                style: { fontSize: 12 },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={APP_STORAGE.org.getErrorLatitude()}
              helperText={APP_STORAGE.org.getHelpTextLatitude()}
              label="Широта"
              autoComplete="Широта"
              size="small"
              onChange={(e) => {
                APP_STORAGE.org.setLatitude(e.target.value);
              }}
              value={APP_STORAGE.org.getLatitude() || ""}
            />

            <TextField
              InputProps={{
                inputComponent: LongInput as any,
                style: { fontSize: 12 },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              margin="normal"
              fullWidth
              error={APP_STORAGE.org.getErrorLongitude()}
              helperText={APP_STORAGE.org.getHelpTextLongitude()}
              required
              label="Долгота"
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
            {APP_STORAGE.org.getSuccessSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  {APP_STORAGE.org.getSuccessSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.org.getErrorSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.org.getErrorSave_mess()}
                </Alert>
              </Stack>
            )}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
