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

import {DevSessCharts} from '../Sensors/DevSessCharts'
import {CustomToolbar} from "./Export";

import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
  GridExcelExportOptions ,
  GridColumns,
  GridRowsProp,
  useGridApiContext,
} from '@mui/x-data-grid-premium';



interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async setRowId(e: string){
    APP_STORAGE.sensors.setOpenDevsess(true)
   APP_STORAGE.sensors.setIdDevSess(e);
   APP_STORAGE.sensors.get_DevSessions("sess_id", APP_STORAGE.auth_form.getdt());
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
    var str: string = ''
    var columns = []
    var row = []
    var date = []; 
    const depgh = []
    var count;
    let sess = APP_STORAGE.sensors;
    let dev_sess: { [x: string]: {
      sess_data: any;
      time_srv: string;
      time_dev: string;
      dev_number: string;
      id: string; level_akb: string; 
}; };
    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
       var sensoers_date = dev_sess[key].sess_data;
      var ss=  JSON.parse(sensoers_date);
      
         for (var i in ss){
          for(var j in ss[i] ){
           
            if(ss[i][j].depgh){
              depgh.push(
                ss[i][j].depgh
              ) 
            }
           
          }
         }
       
        date.push(dev_sess[key]);
        row.push(
          {
            jobTitle: dev_sess[key].dev_number,
            recruitmentDate: dev_sess[key].time_dev,
            contract: dev_sess[key].time_srv,
            id: dev_sess[key].id,
            arb: dev_sess[key].level_akb,
           // depgh: myVar,
          }
        )
        count = (Object.keys(dev_sess).length);
      }
      
      columns.push(
          { 
    field:'jobTitle', 
    headerName: 'Устройства', 
    width: 200 },
  {
    field: 'recruitmentDate',
    headerName: 'Время устройства',
    width: 150,
  },
  {
    field: 'contract',
    headerName: 'Время сервера',
    width: 150,
  },
  {
    field: 'arb',
    headerName: 'АКБ',
    width: 150,
  },
  
  )
      

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
          {/* <Box className="grid_column" sx = {{display:' flex'}}> */}
          <TableContainer>
            <Table >
              <TableBody>
               
                  <TableRow key={"sensors_id" + 98} sx = {{p: '4px'}}>
                    <TableCell colSpan={2} sx={{ color: "#aaa" , p: '4px'}}>
                      СЕССИИ ЗА ПЕРИОД: (кол-во: {count})
                    </TableCell>
                    <TableCell sx={{ width: "80px" , p: '4px'}}></TableCell>
                  </TableRow>
                  
                  {date.map((row : any, i : any) => (
                
                <TableRow key={'' + row.id} sx = {{p: '4px'}} onClick = {()=> {this.setRowId(row.id)}}>
                <TableCell sx = {{p: '4px'}} > {'' + row.id} </TableCell>
                <TableCell sx = {{p: '4px'}} > {'' + row.time_dev} </TableCell>
                <TableCell sx = {{p: '4px'}}> {'' + row.level_akb} </TableCell>
               </TableRow>
            
                 ))} 
              </TableBody>
            </Table>
          </TableContainer>
              

      <DevSessCharts/>
        </Box> 

        <DataGridPremium
        rows={row}
        columns={columns}
        
        components={{
          Toolbar: CustomToolbar, 
        }}
      />
      </React.Fragment>
    );
  }
}
