import React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  TextareaAutosize,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import SensorsIcon from "@mui/icons-material/Sensors";

import { ModalSensors } from "./ModalSensors";
import { TextInput } from "../../../../shared/TextInput";
import { CloseButton } from "../../../../shared/CloseButton";
import LatInput from "../../../../shared/LatInput";
import LongInput from "../../../../shared/LongInput";

interface IProps {}

//Компонент формы приложения
@observer
export class AddNewDevModal extends React.Component<IProps> {
  ////////////////////////Модальное окно - Добавить устройство
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async AddDevs() {
    APP_STORAGE.devs.set_NewDevs("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async SelectedPeriodSess(a: any) {
    APP_STORAGE.devs.setPeriodSess(a);
  }

  render(): React.ReactNode {
    let depth_sensors = [];
    let count: any = "";
    let org = null;
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

    let group_devs = [];
    let devs = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );

    for (var key in devs) {
      if (devs.hasOwnProperty(key)) {
        let a = devs[key];

        if (a.id === APP_STORAGE.devs.getIdChild()) {
          group_devs.push(<Typography> Родитель - {a.g_name} </Typography>);
        }
      }
    }

    if (JSON.stringify(APP_STORAGE.devs.getArray())) {
      var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getArray()));

      const uniqueChars = obj.reduce((o: any, i: any) => {
        ////////////////// Редюсом убираем дубликаты
        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
          o.push(i);
        }
        return o;
      }, []);

      APP_STORAGE.devs.setDepthNewSensors(uniqueChars);

      for (var key in uniqueChars) {
        count = uniqueChars.length;

        depth_sensors.push(
          <TableCell
            key={uniqueChars[key].depth}
            sx={{
              display: "flex",
              fontWeight: "700",
              border: "none",
              p: "4px",
            }}
            align="left"
          >
            <SensorsIcon
              fontSize="small"
              sx={{ pr: "9px", color: "#5be95b" }}
            />{" "}
            {uniqueChars[key].depth}
          </TableCell>
        );
      }
    }

    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.devs.getOpenModal()}
          PaperProps={{
            sx: {
              width: "100%",
              maxHeight: "100%",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography>Добавить устройство</Typography>
              <CloseButton
                onClose={() => APP_STORAGE.devs.setOpenModal(false)}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            {group_devs}

            <TextInput
              error={APP_STORAGE.devs.getNumberError()}
              helperText={APP_STORAGE.devs.getNumberError_mess()}
              label="Номер устройства"
              onChange={(e) => {
                APP_STORAGE.devs.setNumber(e.target.value);
              }}
              value={APP_STORAGE.devs.getNumber()}
            />

            <TextInput
              error={APP_STORAGE.devs.getNameError()}
              helperText={APP_STORAGE.devs.getNameError_mess()}
              label="Название устройства "
              onChange={(e) => {
                APP_STORAGE.devs.setName(e.target.value);
              }}
              value={APP_STORAGE.devs.getName()}
            />

            <TextInput
              InputProps={{
                inputComponent: LatInput as any,
                style: { fontSize: 12 },
              }}
              error={APP_STORAGE.devs.getLongitudeError()}
              helperText={APP_STORAGE.devs.getLongitudeError_mess()}
              label="Долгота"
              onChange={(e) => {
                APP_STORAGE.devs.setLongitude(e.target.value);
              }}
              value={APP_STORAGE.devs.getLongitude()}
            />

            <TextInput
              InputProps={{
                inputComponent: LongInput as any,
                style: { fontSize: 12 },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              error={APP_STORAGE.devs.getLatitudeError()}
              helperText={APP_STORAGE.devs.getLatitudeError_mess()}
              label="Широта"
              onChange={(e) => {
                APP_STORAGE.devs.setLatitude(e.target.value);
              }}
              value={APP_STORAGE.devs.getLatitude()}
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
                APP_STORAGE.devs.setInfo(e.target.value);
              }}
              value={APP_STORAGE.devs.getInfo()}
            />

            <Box
              sx={{ border: "1px solid #eee", p: "12px", borderRadius: "4px" }}
            >
              {count && (
                <Box sx={{ pb: "12px" }}>
                  Список сенсоров на устройстве: {count}
                </Box>
              )}

              <TableContainer component={Paper} sx={{ maxHeight: "150px" }}>
                <Table>
                  <TableBody>
                    <TableRow key="depth_sensors">{depth_sensors}</TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalSensors />

              <Button
                onClick={() => {
                  APP_STORAGE.devs.setDepthSensors(true);
                }}
              >
                Добавить сенсоры
              </Button>

              <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
                <InputLabel className="org" sx={{ fontSize: "12px" }}>
                  Период сессии
                </InputLabel>

                <Select
                  value={APP_STORAGE.devs.getPeriodSess()}
                  sx={{ fontSize: "12px" }}
                  label="Период сессии"
                  onChange={(e) => {
                    this.SelectedPeriodSess(e.target.value);
                  }}
                >
                  <MenuItem key="4_sess" sx={{ fontSize: "12px" }} value="1">
                    Один раз в день
                  </MenuItem>
                  <MenuItem key="3_sess" sx={{ fontSize: "12px" }} value="7">
                    Один раз в неделю
                  </MenuItem>
                  <MenuItem key="2_sess" sx={{ fontSize: "12px" }} value="14">
                    Каждые две недели
                  </MenuItem>
                  <MenuItem key="1_sess" sx={{ fontSize: "12px" }} value="31">
                    Один раз в месяц
                  </MenuItem>
                  <Divider />
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className="button-save new-devs"
                sx={{
                  background: "#266BF1",
                  color: "#fff;",
                  mt: "18px",
                  mb: "18px",
                  fontSize: "12px",
                }}
                onClick={() => {
                  this.AddDevs();
                }}
              >
                Сохранить
              </Button>
            </Box>
            {APP_STORAGE.devs.getSuccessSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  {APP_STORAGE.devs.getSuccessSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.devs.getErrorSave_mess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.devs.getErrorSave_mess()}
                </Alert>
              </Stack>
            )}
            {APP_STORAGE.shared_store.getErrorResponseMess().length > 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {APP_STORAGE.shared_store.getErrorResponseMess()}
                </Alert>
              </Stack>
            )}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
