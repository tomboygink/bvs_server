import * as React from "react";
import {
  Box,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Divider,
  Stack,
  Alert,
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { Padding } from "@mui/icons-material";
import IdInput from "../../../../shared/IdInput";
import LongInput from "../../../../shared/LongInput";
import LatInput from "../../../../shared/LatInput";
import { TextInput } from "../../../../shared/TextInput";

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
        <TextInput
          label="Полное наименование"
          error={
            APP_STORAGE.reg_user.getErrorFullName() ||
            APP_STORAGE.reg_user.getErrorFullNameDouble()
          }
          helperText={
            APP_STORAGE.reg_user.getTextHelpFullName() ||
            APP_STORAGE.reg_user.getTextHelpFullNameDouble()
          }
          onChange={(e) => {
            APP_STORAGE.reg_user.setFullNameOrg(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getFullNameOrg() || ""}
        />

        <TextInput
          label="Наименование"
          error={
            APP_STORAGE.reg_user.getErrorNameOrg() ||
            APP_STORAGE.reg_user.getErrorNameDouble()
          }
          helperText={
            APP_STORAGE.reg_user.getTextHelpNameDouble() ||
            APP_STORAGE.reg_user.getTextHelpNameOrg()
          }
          onChange={(e) => {
            APP_STORAGE.reg_user.setNameOrg(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getNameOrg() || ""}
        />

        <TextInput
          label="ИНН"
          InputProps={{
            inputComponent: IdInput as any,
            style: { fontSize: 12 },
          }}
          error={
            APP_STORAGE.reg_user.getErrorInn() ||
            APP_STORAGE.reg_user.getErrorInnDouble()
          }
          helperText={
            APP_STORAGE.reg_user.getTextHelpInn() ||
            APP_STORAGE.reg_user.getTextHelpInnDouble()
          }
          onChange={(e) => {
            APP_STORAGE.reg_user.setInn(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getInn() || ""}
        />

        <TextInput
          label="Адрес"
          error={APP_STORAGE.reg_user.getErrorAddress()}
          helperText={APP_STORAGE.reg_user.getTextHelpAddress()}
          onChange={(e) => {
            APP_STORAGE.reg_user.setAddress(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getAddress() || ""}
        />
        <TextInput
          label="Широта"
          InputProps={{
            inputComponent: LatInput as any,
            style: { fontSize: 12 },
          }}
          error={APP_STORAGE.reg_user.getErrorLatitude()}
          helperText={APP_STORAGE.reg_user.getTextHelpLatitude()}
          onChange={(e) => {
            APP_STORAGE.reg_user.setLatitude(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getLatitude() || ""}
        />
        <TextInput
          label="Долгота"
          InputProps={{
            inputComponent: LongInput as any,
            style: { fontSize: 12 },
          }}
          error={APP_STORAGE.reg_user.getErrorLongitude()}
          helperText={APP_STORAGE.reg_user.getTextHelpLongitude()}
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
