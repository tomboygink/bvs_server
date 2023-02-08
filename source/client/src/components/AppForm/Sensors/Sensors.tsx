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

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';





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
    var sensors: React.ReactNode[] = new Array();         ////// отображаем сенсоры 

  
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
              
      for (var key1 in gr_devs) {
        if ("_dev_id_key_" + gr_devs[key1].id === APP_STORAGE.devs.getIdChild() 
            &&  APP_STORAGE.devs_groups.getMiddleForm() === 2
        ) {
          for (var key in gr_devs[key1].sensors.s) {
            console.log('массив' , gr_devs[key1].deleted)
                if(gr_devs[key1].deleted === true){
                  sensors.push(
                            <TableRow key={"sensors_id" + gr_devs[key1].sensors.s[key]}>
                                  <TableCell ><SensorsIcon
                                        fontSize="small"
                                        sx={{  color: "#808080" }}
                                  />
                                  </TableCell>
                                  <TableCell >[00{key}]</TableCell>
                                  <TableCell >
                                        [{"" + gr_devs[key1].sensors.s[key]}]{" "}
                                    </TableCell>
                            </TableRow>
                  );
                
                }

                if(gr_devs[key1].deleted === false){
                  sensors.push(
                    <TableRow key={"sensors_id" + gr_devs[key1].sensors.s[key]}>
                          <TableCell ><SensorsIcon
                          fontSize="small"
                          sx={{  color: "#5be95b" }}
                        />
                        </TableCell>
                      <TableCell >[00{key}]</TableCell>
                      <TableCell
                        sx={{ fontWeight: "700" }}>
                        [{"" + gr_devs[key1].sensors.s[key]}]{" "}
                      </TableCell>
                    </TableRow>
                  );
                
                }
           
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
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            width: '100%',
          }}
        >
          
          <Box
            sx={{
              width: '100%' ,
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
                <TableBody>
                  {(APP_STORAGE.devs_groups.getMiddleForm() === 2) && 
                <TableRow key={"sensors_id" + 98}>
                 <TableCell colSpan={2}>
                  Список сенсоров: 
                  </TableCell>
               <TableCell sx={{width: '80px'}} onClick={() =>{this.sort_sensors()}}>
                <ArrowDownwardIcon fontSize="small" sx={{p: '2px'}}/>
                <ArrowUpwardIcon fontSize="small" sx={{p: '2px'}}/>
              </TableCell>
              </TableRow>}

                  {this.drawDevLocation()}
                  </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}
