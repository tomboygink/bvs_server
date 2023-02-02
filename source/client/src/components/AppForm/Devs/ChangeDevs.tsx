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

import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import SensorsIcon from "@mui/icons-material/Sensors";

import { Change_ModalSensors} from "./Change_ModalSensors";

import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface IProps {}

//Компонент формы приложения
@observer
export class ChangeDevs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }
  
  async ChangeSensors (a:any) {
    APP_STORAGE.devs.setSensors(a);
    var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
    for (let i = 0; i < obj.length; i++){
      
      if( Number(APP_STORAGE.devs.getSensors()) === Number(obj[i]) ){
        delete obj[i]; 
      }
      const array = obj
      const array2 = array.filter((element: any) => element !== null);
      APP_STORAGE.devs.setChangeSensors(array2)
    }
    APP_STORAGE.devs.setDepthSensors_Ch(true)
  }

  render(): React.ReactNode {
    let depth_sensors = [];

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
      const obj1:any = {};
      var obj = JSON.parse(JSON.stringify(APP_STORAGE.devs.getChangeSensors()));
     
        for (let i = 0; i < obj.length; i++) {
          obj1[i] = obj[i];
          depth_sensors.push(
            <TableRow key= {obj1[i]}>
              <TableCell
              key={obj1[i]}
              sx={{
                display: "flex",
                fontWeight: "700",
                border: "none",
              }}
              align="left"
            >
              <SensorsIcon
                fontSize="small"
                sx={{ pr: "9px", color: "#5be95b" }}
              />{" "}
              
              <TextField
                 id = {"_id_s" + obj1[i]} 
                sx={{ mt: "14px" }}
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
                value= {obj1[i]} 
              />
            </TableCell>
  
  <TableCell align="left" sx={{ color: "#038F54" }}>
  <AddIcon fontSize="small" />
  </TableCell>
  <TableCell align="left" sx={{ color: "#1976D2" }} onClick = {(e)=> {this.ChangeSensors((document.getElementById("_id_s" + obj1[i]) as HTMLInputElement).value)}}>
  
  
  <ModeEditOutlineOutlinedIcon fontSize="small" />
  </TableCell>
  <TableCell align="left" sx={{ color: "#FF4848" }}>
  <DeleteOutlineOutlinedIcon fontSize="small" />
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
                  APP_STORAGE.devs.setOpenModalChange(false);
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            {group_devs}

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
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
              <Box sx={{ pb: "12px" }}>Список сенсоров на устройстве11:</Box>
              <TableContainer  component={Paper} sx = {{maxHeight: '150px'}}>
                <Table aria-label="caption table">
                  <TableBody>
                
                      {depth_sensors}
                     
                  </TableBody>
                </Table>
              </TableContainer>
              <Change_ModalSensors />

              <Button
                onClick={() => {
                  APP_STORAGE.devs.setDepthSensors(true);
                }}
              >
                Добавить
              </Button>
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
                  APP_STORAGE.devs.set_ChangeDevs("sess_id",APP_STORAGE.auth_form.getdt());
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
