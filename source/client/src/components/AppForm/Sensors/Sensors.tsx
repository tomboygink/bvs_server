import * as React from "react";
import { Box, Alert, Typography, TextField } from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";

interface IProps {}

//Компонент формы приложения
@observer
export class Sensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal() {
    APP_STORAGE.devs.setOpenModal(true);
  }

  async sort_sensors(){

  }

  drawSensors(dgrs: TDevsGroup[]): React.ReactNode[] {
    var sensors: React.ReactNode[] = new Array();          ////// отображаем сенсоры 
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      for (var key1 in gr_devs) {
        if (
          "_dev_id_key_" + gr_devs[key1].id === APP_STORAGE.devs.getIdChild() 
          // &&  APP_STORAGE.devs_groups.getMiddleForm() === 2
        ) {
          for (var key in gr_devs[key1].sensors.s) {
            sensors.push(
              <TableRow key={"sensors_id" + gr_devs[key1].sensors.s[key]}>
                <TableCell
                  sx={{ display: "flex", fontWeight: "700", border: "none" }}
                  align="left"
                >
                  <SensorsIcon
                    fontSize="small"
                    sx={{ pr: "9px", color: "#5be95b" }}
                  />
                  [{"" + gr_devs[key1].sensors.s[key]}]{" "}
                </TableCell>
                <TableCell onClick={() =>{this.sort_sensors()}}><ExpandLessIcon/></TableCell>
                <TableCell><ExpandMoreIcon/></TableCell>
              </TableRow>
            );
          }
        }
      }

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawSensors(gr_childs);

      sensors.push(childs);
    }
    return sensors;
  }


  drawDevLocation(): React.ReactNode {
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
    }

    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a);

        if (root.childs.length > 0) {
          for (let i = 0; i < root.childs.length; i++) {
            DevGr.push(root.childs[i]);
          }
        }
      }
    }

    return this.drawSensors(DevGr);
  }

  render(): React.ReactNode {
    return (
      <>
        <Box
          className="wrapper-devs"
          sx={{
            //mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            width: '100%',
            // ml: "1rem",
            // mr: "32px",
            // height: '90vh'
          }}
        >
          {/* <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список сенсоров
          </Typography> */}

          <Box
            sx={{
              width: '100%' ,
             /// p: "25px",
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: 'auto'
            }}
          >
            <TableContainer>
              <Table aria-label="caption table">
                <TableBody>{this.drawDevLocation()}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}
