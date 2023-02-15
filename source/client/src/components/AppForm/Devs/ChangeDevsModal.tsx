import React from "react";
import { observer } from "mobx-react";
import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  TextareaAutosize,
  Button,
  MenuItem,
} from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import { AntSwitch } from "../AppBarPanel/LeftPanel/RegistationUsers/switch";

import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import SensorsIcon from "@mui/icons-material/Sensors";

import { Change_ModalSensors } from "./AddSensorsModal";

import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {TDSensor} from '../../../storage/components/Devs/DevEntityes';

interface IProps {}

//Компонент формы приложения
@observer
export class ChangeDevsModal extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs.setOpenModalChange(false);

    APP_STORAGE.devs.setNumberError(false);
    APP_STORAGE.devs.setNumberError_mess("");
    APP_STORAGE.devs.setNumber("");

    APP_STORAGE.devs.setNameError(false);
    APP_STORAGE.devs.setNameError_mess("");
    APP_STORAGE.devs.setName("");

    APP_STORAGE.devs.setLongitudeError(false);
    APP_STORAGE.devs.setLongitudeError_mess("");
    APP_STORAGE.devs.setLongitude("");

    APP_STORAGE.devs.setLatitudeError(false);
    APP_STORAGE.devs.setLatitudeError_mess("");
    APP_STORAGE.devs.setLatitude("");
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async ChekedForEdit(editing: any) {
    APP_STORAGE.devs.setCheckboxEd(editing.target.checked);
  }

  async ChangeSensors(a: any) {
    APP_STORAGE.devs.setSensors(a);
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    for (let i = 0; i < obj.length; i++) {
      if (Number(APP_STORAGE.devs.getSensors()) === Number(obj[i].depth)) {
        delete obj[i].depth;
        delete obj[i].value;
      }
      const array = obj;
      const array2 = array.filter((element: any) => element !== null);
      APP_STORAGE.devs.setChangeSensors(array2);
    }
    APP_STORAGE.devs.setDepthSensors_Ch(true);
  }

  async DeleteSensors(a: any) { //////////////////////////////////////////////Удаление сенсоров 
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    for (let i = 0; i < obj.length; i++) {
      if (Number(a) === Number(obj[i].depth)) {
        delete obj[i].depth;
        delete obj[i].value;
      }
      const array = obj;
      const array2 = array.filter((element: any) => element !== null);
      APP_STORAGE.devs.setChangeSensors(array2);
    }
  }

  async AddSensors(a: any) {
    APP_STORAGE.devs.setDepthSensors_Ch(true);
  }

  async ChangeDevs() {


    console.log('APP_STORAGE.devs.getChangeSensors()', APP_STORAGE.devs.getChangeSensors())
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    let sensors: Array<any> = [];
    let a: TDSensor
    let uniqueChars = obj.filter((element: any, index: any) => { ///////////////////////// Убираем дубли массива
      return obj.indexOf(element) === index;
    });
    // for (let i = 0; i < uniqueChars.length; i++) {
    //   a = {"depth": uniqueChars[i] , "value" : 1 }
    //   sensors.push(
    //     sensors.push(a));  
  
    //   APP_STORAGE.devs.setChangeSensors(sensors);
    // }
 
    APP_STORAGE.devs.set_ChangeDevs("sess_id", APP_STORAGE.auth_form.getdt());
    setTimeout(() => {
      APP_STORAGE.devs_groups.get_DevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }, 500);
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

    if (APP_STORAGE.devs.getChangeSensors()) {
      const obj1: any = {};
      let ssss = [];
      var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));

      let uniqueChars = obj.filter((element: any, index: any) => {
        return obj.indexOf(element) === index;
      });

      for (let i = 0; i < uniqueChars.length; i++) {
        obj1[i] = uniqueChars[i];

        count = uniqueChars.length;

        ssss.push(obj1[i]);

        if (uniqueChars[i].depth) {
          depth_sensors.push(
            <TableRow key={uniqueChars[i].depth}>
              <TableCell
                key={uniqueChars[i].depth}
                sx={{
                  display: "flex",
                  fontWeight: "700",
                  border: "none",
                }}
                align="left"
              >
                <TextField
                  id={"_id_s" + uniqueChars[i].depth}
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  variant="outlined"
                  fullWidth
                  required
                  label="Глубина"
                  autoComplete="Глубина"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    APP_STORAGE.devs.setNumber(e.target.value);
                  }}
                  value={uniqueChars[i].depth}
                />
              </TableCell>
  
              <TableCell
                align="left"
                sx={{ color: "#1976D2" }}
                onClick={(e) => {
                  this.AddSensors(
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <AddIcon fontSize="small" />
              </TableCell>
  
              <TableCell
                align="left"
                sx={{ color: "#1976D2" }}
                onClick={(e) => {
                  this.ChangeSensors(
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <ModeEditOutlineOutlinedIcon fontSize="small" />
              </TableCell>
  
              <TableCell
                align="left"
                sx={{ color: "#FF4848" }}
                onClick={(e) => {
                  this.DeleteSensors(
                    (
                      document.getElementById(
                        "_id_s" + uniqueChars[i].depth
                      ) as HTMLInputElement
                    ).value
                  );
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </TableCell>
            </TableRow>
          );
        }
      
      }



      if (!obj.length) {
        depth_sensors.push(
          <TableRow key="key_0">
            <TableCell
              sx={{
                display: "flex",
                fontWeight: "700",
                border: "none",
              }}
              align="left"
            >
              <TextField
                id={"_id_s" + 7777}
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                fullWidth
                required
                label="Глубина"
                autoComplete="Глубина"
                autoFocus
                size="small"
                value={""}
              />
            </TableCell>

            <TableCell
              align="left"
              sx={{ color: "#1976D2" }}
              onClick={(e) => {
                this.AddSensors(1);
              }}
            >
              <AddIcon fontSize="small" />
            </TableCell>

            <TableCell align="left" sx={{ color: "#1976D2" }}>
              {/* <ModeEditOutlineOutlinedIcon fontSize="small" /> */}
            </TableCell>

            <TableCell align="left" sx={{ color: "#FF4848" }}>
              {/* <DeleteOutlineOutlinedIcon fontSize="small" /> */}
            </TableCell>
          </TableRow>
        );
      }
    }

    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.devs.getOpenModalChange()}
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
              <Typography>Редактировать устройство</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  this.closeModal();
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            {group_devs}

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              error={APP_STORAGE.devs.getNumberError()}
              helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Номер устройства"
              autoComplete="Номер устройства"
              autoFocus
              size="small"
              onChange={(e) => {
                APP_STORAGE.devs.setNumber(e.target.value);
              }}
              value={APP_STORAGE.devs.getNumber()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              error={APP_STORAGE.devs.getNameError()}
              helperText={APP_STORAGE.devs.getNamaError_mess()}
              fullWidth
              required
              label="название устройства "
              autoComplete="Название устройства"
              autoFocus
              size="small"
              onChange={(e) => {
                APP_STORAGE.devs.setName(e.target.value);
              }}
              value={APP_STORAGE.devs.getName()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              error={APP_STORAGE.devs.getLongitudeError()}
              helperText={APP_STORAGE.devs.getLongitudeError_mess()}
              fullWidth
              required
              label="Долгота"
              autoComplete="долгота"
              autoFocus
              size="small"
              onChange={(e) => {
                APP_STORAGE.devs.setLongitude(e.target.value);
              }}
              value={APP_STORAGE.devs.getLongitude()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              error={APP_STORAGE.devs.getLatitudeError()}
              helperText={APP_STORAGE.devs.getLatitudeError_mess()}
              fullWidth
              required
              label="Широта"
              autoComplete="широта"
              autoFocus
              size="small"
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
              <Box sx={{ pb: "12px" }}>
                Список сенсоров на устройстве : {count}
              </Box>
              <TableContainer component={Paper} sx={{ maxHeight: "150px" }}>
                <Table aria-label="caption table">
                  <TableBody>{depth_sensors}</TableBody>
                </Table>
              </TableContainer>
              <Change_ModalSensors />
            </Box>

            <FormGroup sx={{ mt: "12px" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Заблокировать -{" "}
                </Typography>
                <AntSwitch
                  checked={APP_STORAGE.devs.getCheckboxEd()}
                  onChange={(editing) => {
                    this.ChekedForEdit(editing);
                  }}
                />
              </Stack>
            </FormGroup>

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
                  this.ChangeDevs();
                }}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
