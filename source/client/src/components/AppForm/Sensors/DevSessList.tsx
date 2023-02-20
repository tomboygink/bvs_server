import * as React from "react";
import { Box, Alert, Typography, TextField } from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";

interface IProps {}

//Компонент формы приложения
@observer
export class DevSessList extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
    let qqq = []
    var sensors = []; ////// отображаем сенсоры
   let sess = APP_STORAGE.sensors;
   let sessors;
    if (sess.getDevSession){
         sessors = sess.getDevSession();
          for (var key in  sessors){

                let sess_data = JSON.parse( (sessors[key].sess_data));
                    console.log(sess_data.s);
                    const uniqueChars = sess_data.s.reduce((o: any, i: any) => {  ////////////////// Редюсом убираем дубликаты
                        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
                          o.push(i);
                        }
                        return o;
                      }, []);

                      for (var i in uniqueChars) {
                        if(String(APP_STORAGE.sensors.getIdDevSess()) === String(sessors[key].id))
                            sensors.push(
                                <>
                                  <TableRow key={"sensors_id"+{i} + uniqueChars[i].depth}>
                                    <TableCell>
                                      <SensorsIcon fontSize="small" sx={{ color: "#808080" }} />
                                    </TableCell>
                                    <TableCell>[00{i}]</TableCell>
                                    <TableCell>[{"" + uniqueChars[i].depth}] </TableCell>
                                  </TableRow>
                                </>
                              );
                        
                     
                      }
               
                 
          } 
         
    }

    return (
      <>
       {APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
          <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>
              {" "}
              Список сенсоров{" "}
            </Typography>
  }
        <Box
          className="wrapper-devs"
          sx={{
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            <TableContainer>
              <Table aria-label="caption table">
                <TableBody>
                  {APP_STORAGE.devs_groups.getMiddleForm() === 2 && (
                    <TableRow key={"sensors_id" + 98}>
                      <TableCell colSpan={2} sx ={{color: '#aaa'}} >Глубина датчиков:</TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        <ArrowDownwardIcon
                          className={APP_STORAGE.sensors.getActiveButtonSort()}
                          fontSize="small"
                          sx={{ p: "2px" }}
                        //   onClick={() => {
                        //     this.SortDescSensors("0");
                        //   }}
                        />
                        <ArrowUpwardIcon
                          className={APP_STORAGE.sensors.getActiveButtonSortDesc()}
                          fontSize="small"
                          sx={{ p: "2px" }}
                        //   onClick={() => {
                        //     this.SortDescSensors("1");
                        //   }}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {sensors}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}
