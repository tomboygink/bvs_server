import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import {DevSessCharts} from '../Sensors/DevSessCharts'
import  {CustomExport}  from "./Export";



interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleExportExel(){
    var XLSX = require("xlsx");
    var table_elt = document.getElementById('my-table-id');
    var workbook = XLSX.utils.table_to_book(table_elt);

//var ws = workbook.Sheets["Sheet1"];
// XLSX.utils.sheet_add_aoa(ws, [["Дата вы "+new Date().toISOString()]], {origin:-1});

XLSX.writeFile(workbook, "Report.xlsx");
  }

  async handleExportCSV(){
    var XLSX = require("xlsx");
    var table_elt = document.getElementById('my-table-id');
    var workbook = XLSX.utils.table_to_book(table_elt);

XLSX.writeFile(workbook, "Report.csv");
  }


  async setRowId(e: string){
   APP_STORAGE.sensors.setOpenDevsess(true)
   APP_STORAGE.sensors.setIdDevSess(e);
   APP_STORAGE.sensors.get_DevSessions("sess_id", APP_STORAGE.auth_form.getdt());



   var data: any[] = []; ////// отображаем сенсоры


  let sess = APP_STORAGE.sensors;
  let sessors;
   if (sess.getDevSession){
        sessors = sess.getDevSession();
        console.log('sessors', sessors)
  
       for (var key in  sessors){

                let sess_data = JSON.parse( (sessors[key].sess_data));
                   const uniqueChars = sess_data.s.reduce((o: any, i: any) => {  
                       if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
                         o.push(i);
                       }
                       return o;
                     }, []);

                    for (var i in uniqueChars) {
                     if(String(APP_STORAGE.sensors.getIdDevSess()) === String(sessors[key].id)){ 
                           data.push(
                             {
                               name: String(uniqueChars[i].depth) +'м',
                               uv: 1,
                               'град.': uniqueChars[i].data,
                               amt: 2100
                             });
                          }
                    }   
         } 
  }
  APP_STORAGE.sensors.dataCharts = data;
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
    let count_sess = [];
    var ses_depth = [];
    var ses_date = [];
    var date = []; 
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
         
        let senso = JSON.parse(dev_sess[key].sess_data)
        
       
        if(String(APP_STORAGE.sensors.getIdDevSess()) === String(dev_sess[key].id)){  
        count_sess.push(senso.s.length)
        ses_depth.push(
           senso.s.map((row : any, i : any) => (
             <TableCell sx = {{p: '4px'}}> {'' + row.depth} </TableCell>
             ))
        )
        ses_date.push(
         senso.s.map((row : any, i : any) => (
           <TableCell sx = {{p: '4px'}}> {'' + row.data} </TableCell>
           ))
        )

}

        date.push(
          dev_sess[key]
          );
        count = (Object.keys(dev_sess).length);
      }}





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
          {date.length &&
          <TableContainer sx={{mt: '20px'}}>

            <Table>
              <TableBody>
                  <TableRow key={"sensors_id"} sx = {{p: '4px'}}>
                    <TableCell colSpan={2} sx={{ color: "#266bf1" , p: '4px', fontWeight: '500'}}>
                      СЕССИИ ЗА ПЕРИОД: (кол-во: {count})
                    </TableCell>
                    <TableCell sx={{ width: "80px" , p: '4px'}}></TableCell>
                  </TableRow>
                  
                  {date.map((row : any, i : any) => (
                
                <TableRow key={'key_row' + row.id} sx = {{p: '4px'}} onClick = {()=> {this.setRowId(row.id)}}>
                <TableCell sx = {{p: '4px'}} > {'' + row.id} </TableCell>
                <TableCell sx = {{p: '4px'}} > {'' + row.time_dev} </TableCell>
                <TableCell sx = {{p: '4px'}}> {'' + row.level_akb} </TableCell>
         
              
               </TableRow>
            
                 ))} 
              </TableBody>
            </Table>
            
          <Link sx = {{mr: '12px', fontSize: '14px'}}
            onClick={() => this.handleExportExel()}
          >
            Excel 
          </Link>

          <Link sx={{fontSize: '14px'}} onClick={() => this.handleExportCSV()}>
            SCV 
          </Link>

          </TableContainer>
              }
         

        </Box> 

        <CustomExport/>
        {ses_depth.length && 
        <>         <Box sx= {{color: '#111',fontWeight: '500', mt: '20px', mb: '12px'}}>Выбранная сессия (Кол-во датчиклв: {count_sess})</Box>
        <Table sx ={{mb: '20px', p: '12px', background: 'rgb(25 118 210 / 8%)', borderRadius: '4px'}}>
        <TableBody>
          <TableRow>
            <TableCell>Глубина</TableCell>
            {ses_depth}</TableRow>
          <TableRow>
          <TableCell>Температура</TableCell>
            {ses_date}</TableRow>
         </TableBody>
        </Table>
        </>}
        <DevSessCharts/>

      </React.Fragment>
    );
  }
}
