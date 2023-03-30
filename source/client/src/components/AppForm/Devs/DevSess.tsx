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

import { TablePagination } from '@mui/material';
import EnhancedTable  from './TAbleDevs'

import { CustomExport } from "./Export";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Calendar } from "./Calendar";

interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleExportExel() {
    var XLSX = require("xlsx");
    var table_elt = document.getElementById("my-table-id");
    var workbook = XLSX.utils.table_to_book(table_elt);
    XLSX.writeFile(workbook, "Report.xlsx");
  }


  async handleExportCSV() {
    var XLSX = require("xlsx");

  var table = document.getElementById("my-table-id");
var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" });
var ws1 = wb.Sheets[wb.SheetNames[0]];
var csv = XLSX.utils.sheet_to_csv(ws1, { strip: true, FS: "|" });
this.download_file_csv(csv);}

async download_file_csv(content: any) {
var csvString = content;
var universalBOM = "\uFEFF";
var a = window.document.createElement('a');
a.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM+csvString));
a.setAttribute('download', 'Report.csv');
window.document.body.appendChild(a);
a.click();
} 
 

// async getIntroOfPage(label: any){

// }




  async setRowId(e: string, time: string) {
    APP_STORAGE.sensors.setChoseSessTime(time)
    APP_STORAGE.sensors.setOpenDevsess(true);
    APP_STORAGE.sensors.setIdDevSess(e);
    APP_STORAGE.sensors.get_DevSessions(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );

    var data: any[] = []; ////// отображаем сенсоры

    let sess = APP_STORAGE.sensors;
    let sessors;
    if (sess.getDevSession) {
      sessors = sess.getDevSession();

      for (var key in sessors) {
        let sess_data = JSON.parse(sessors[key].sess_data);
        const uniqueChars = sess_data.s.reduce((o: any, i: any) => {
          if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
            o.push(i);
          }
          return o;
        }, []); 

        for (var i in uniqueChars.sort((a: { depth: number; },b: { depth: number; }) =>  b.depth - a.depth )) {
          if (
            String(APP_STORAGE.sensors.getIdDevSess()) ===
            String(sessors[key].id)
          )
          
          {
            data.push({
              name: String(uniqueChars[i].depth),
              "град.": uniqueChars[i].data
            });

         
          }

          APP_STORAGE.sensors.setdataCharts(data);
        }
      }
    }
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
    let dev_sess: {
      [x: string]: {
        sess_data: any;
        time_srv: string;
        time_dev: string;
        dev_number: string;
        id: string;
        level_akb: string;
      };
    };


    if (sess.getSessPeriodStart() === "" || sess.getSessPeriodEnd() === "") {
  
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; // смещение в миллисекундах
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
      sess.setSessPeriodStart(localISOTime);
      sess.setSessPeriodEnd(localISOTime); // => '2023-03-16T09:00'
    }


    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
        let senso = JSON.parse(dev_sess[key].sess_data);

        if (
          String(APP_STORAGE.sensors.getIdDevSess()) ===
          String(dev_sess[key].id)
        ) {
          count_sess.push(senso.s.length);

          ses_depth.push(
            senso.s.map((row: any, i: any) => (
              <React.Fragment key={"data_" + row.data + row.depth}>
                <TableCell
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  {"" + row.depth}{" "}
                </TableCell>
              </React.Fragment>
            ))
          );
          ses_date.push(
            senso.s.map((row: any, i: any) => (
              <React.Fragment key={"data_qdsadsd" + row.data + row.depth}>
                <TableCell
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  {"" + row.data}{" "}
                </TableCell>
              </React.Fragment>
            ))
          );
        }

        date.push(dev_sess[key]);
        count = Object.keys(dev_sess).length;

        if(document.getElementById(dev_sess[key].id)){
          if(document.getElementById(dev_sess[key].id).id === APP_STORAGE.sensors.getIdDevSess()){
            document.getElementById(dev_sess[key].id).style.backgroundColor = '#E3EEFA'
          }
          else if(document.getElementById(dev_sess[key].id).id !== APP_STORAGE.sensors.getIdDevSess()){
            document.getElementById(dev_sess[key].id).style.backgroundColor = '#fff'
          }
        }
      
     
      }
    }

    return (
      <React.Fragment>
            
         {date.length > 0 && (
        <Box  sx={{ mt: "32px" }}>
       
            <> 
            <Box className="session_pediod" sx ={{display: 'flex', justifyContent: "space-between"}}>
            <Typography  sx={{ color: "#266bf1",  fontWeight: "500" }}> СЕССИИ ЗА ПЕРИОД: (кол-во: {count})</Typography>
            <Typography
            sx={{
              fontSize: "12px",
              color: "#AAAAAA"
            }}
          >
            Таблица сессий по периоду
          </Typography>
            </Box>
         


             <TableContainer sx={{ mt: "10px",mb: '10px',  maxHeight: '200px' }}>
              <Table >
                <TableBody>
                  {date.map((row: any, i: any) => (
                    <TableRow
                      key={"key_row" + row.id}
                      className = 'active_row'
                      id ={row.id}
                      onClick={() => {
                        this.setRowId(row.id, row.time_dev.replace('T', ' '));
                      }}
                    >
                      <TableCell sx={{ p: "4px" }}> {"" + i} </TableCell>
                      <TableCell sx={{ p: "4px" }}>
                        {" "}
                        {"" + row.time_dev.replace('T', ' ')}{" "}
                      </TableCell>
                      <TableCell sx={{ p: "4px" }}>
                        {" "}
                        {"" + row.level_akb}{" "}
                      </TableCell>
                    
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
                className="setDevSess"
                sx={{
                  background: "#038F54",
                  color: "#fff;",
                  fontSize: "12px",
                  mt: "12px",
                  mr: "16px",
                }}
                onClick={() => this.handleExportExel()}
              >
                Документ в формате XLSX{" "}
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: "#fff",
                    background: "#3FAE7F",
                    borderRadius: "4px",
                    ml: "4px",
                  }}
                />
              </Button>

              <Button
                className="setDevSess"
                sx={{
                  background: "#E1BE08",
                  color: "#fff;",
                  fontSize: "12px",
                  mt: "12px",
                }}
                onClick={() => this.handleExportCSV()}
              >
                Документ в формате CSV{" "}
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: "#fff",
                    background: "#EAD460",
                    borderRadius: "4px",
                    ml: "4px",
                  }}
                />
              </Button>
            </>
        </Box>
 )}
        <CustomExport />

        {/* {ses_depth.length > 0 && (
          <>
            <Typography
              sx={{
                fontWeight: "500",
                color: "#111111",
                mb: "8px",
                mt: "20px",
              }}
            >
              Выбранная сессия (Кол-во датчиков: {count_sess})
            </Typography>
            
            <Table
              sx={{
                mb: "20px",
                p: "12px",
                background: "#E3EEFA",
                borderRadius: "4px",
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell>Глубина</TableCell>
                  {ses_depth}
                </TableRow>
                <TableRow>
                  <TableCell>Температура</TableCell>
                  {ses_date}
                </TableRow>
              </TableBody>
            </Table>
          
          </>

        )} */}
      </React.Fragment>
    );
  }
}


