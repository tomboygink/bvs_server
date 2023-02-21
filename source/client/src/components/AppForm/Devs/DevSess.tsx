import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {data} from "../Devs/StyledMua";
import { id_dev_sess } from "../Devs/StyledMua";



interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async setRowId(a:any){
    alert(a)
    alert('22')
  }
  async setDevSess() {
    let sess = APP_STORAGE.sensors;
    if (sess.getSessPeriodStart() === "" || sess.getSessPeriodEnd() === "") {
      var now = new Date();
      sess.setSessPeriodStart(String(now.toISOString()));
      sess.setSessPeriodEnd(String(now.toISOString()));
    }
    sess.get_DevSessions("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    var sensors = []; ////// отображаем сенсоры
    var count;
    let sess = APP_STORAGE.sensors;
    let dev_sess: { [x: string]: {
      dev_number: string;
      id: string; level_akb: string; 
}; };
    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());
      
      for (var key in dev_sess) {
      count = (Object.keys(dev_sess).length);
        // sensors.push(
        //   <div onClick={() => {
        //     this.setRowId(document.getElementById("sensors_id" + dev_sess[key].id).id);
        //   }}>
        //     <TableRow id={"sensors_id" + dev_sess[key].id} key={"sensors_id" + dev_sess[key].id} >
        //       <TableCell> {dev_sess[key].id}</TableCell>
        //       <TableCell>[{"" + dev_sess[key].dev_number}] </TableCell>
        //       <TableCell>[{"" + dev_sess[key].level_akb}] </TableCell>
        //     </TableRow>
        //     </div>
        // );

            sensors.push(
              <TreeItem
              nodeId={String(dev_sess[key].id)}
              label={dev_sess[key].id}
              sx={{ color: "#222", borderBottom: '1px solid #c1c1c1' }}
            >
             
            </TreeItem>
        );
      }

      // }
    }
    return (
      <React.Fragment>
        <Box className="wrappert-devs" sx={{ mt: "20px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#AAAAAA",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {" "}
            Выборка сессий устройства {APP_STORAGE.sensors.getNumber()} по
            периоду{" "}
          </Typography>

          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              id="datetime-local"
              label="Начало периода"
              type="datetime-local"
              defaultValue={
                APP_STORAGE.sensors.getSessPeriodStart() || "2023-05-24T10:30"
              }
              onChange={(e) => {
                APP_STORAGE.sensors.setSessPeriodStart(e.target.value);
              }}
              sx={{ width: 250, mr: "22px", mt: "12px", mb: "12px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              size="small"
              id="datetime-local"
              label="Окончание периода"
              type="datetime-local"
              defaultValue={
                APP_STORAGE.sensors.getSessPeriodEnd() || "2023-05-24T10:30"
              }
              onChange={(e) => {
                APP_STORAGE.sensors.setSessPeriodEnd(e.target.value);
              }}
              sx={{ width: 250, mt: "12px", mb: "12px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Button
            className="setDevSess"
            sx={{
              background: "#266BF1",
              color: "#fff;",
              fontSize: "12px",
            }}
            onClick={() => {
              this.setDevSess();
            }}
          >
            Установить переод
          </Button>
          <Box className="grid_column" sx = {{display:' flex'}}>
          <TableContainer>
            <Table >
              <TableBody>
               
                  <TableRow key={"sensors_id" + 98} sx = {{p: '4px'}}>
                    <TableCell colSpan={2} sx={{ color: "#aaa" , p: '4px'}}>
                      СЕССИИ ЗА ПЕРИОД: (кол-во: {7})
                    </TableCell>
                    <TableCell sx={{ width: "80px" , p: '4px'}}></TableCell>
                  </TableRow>
             
                  <TableRow key={"sensors_id" + 7776} sx = {{p: '4px'}}>
                  <TableCell sx = {{p: '4px'}} colSpan={2}> 28-09-2022 04:11 </TableCell>
                  <TableCell sx = {{p: '4px'}}> АКВ: 4.74 </TableCell>
                 </TableRow>

                 <TableRow sx = {{p: '4px'}} key={"sensors_id" + 775576} >
                  <TableCell sx = {{p: '4px'}} colSpan={2}> 28-09-2022 04:11 </TableCell>
                  <TableCell sx = {{p: '4px'}} > АКВ: 4.74 </TableCell>
                </TableRow>

                <TableRow key={"sensors_id" + 77765} >
                  <TableCell sx = {{p: '4px'}} colSpan={2}> 28-09-2022 04:11 </TableCell>
                  <TableCell sx = {{p: '4px'}} > АКВ: 4.74 </TableCell>
                </TableRow>

                <TableRow key={"sensors_id" + 777121265} >
                  <TableCell sx = {{p: '4px'}} colSpan={2}> 28-09-2022 04:11 </TableCell>
                  <TableCell sx = {{p: '4px'}} > АКВ: 4.74 </TableCell>
                </TableRow>

                <TableRow key={"sensors_id" + 7722765} >
                  <TableCell sx = {{p: '4px'}} colSpan={2}> 28-09-2022 04:11 </TableCell>
                  <TableCell sx = {{p: '4px'}} > АКВ: 4.74 </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
              
     <LineChart width={400} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#266BF1" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
          </Box>
     



        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", mt: "8px" }}>
          <Button
            sx={{
              background:
                "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
              borderRadius: "4px",
              border: "1px solid #a1919142",
              mr: "8px",
              color: "#111",
            }}
          >
            Excel
          </Button>
          <Button
            sx={{
              background:
                "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
              orderRadius: "4px",
              border: "1px solid #a1919142",
              color: "#111",
            }}
          >
            CSV
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}
