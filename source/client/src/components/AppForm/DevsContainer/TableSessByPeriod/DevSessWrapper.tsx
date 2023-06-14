import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import { TableCell } from "@mui/material";



import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ExportTable } from "./ExportTable";

import { DevSessTable } from './DevSessTable'; ////////////////////// Таблица сессий





interface IProps {}

//Устройства
@observer
export class DevSessWrapper extends React.Component<IProps> {
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
    this.download_file_csv(csv);
  }

  async download_file_csv(content: any) {
    var csvString = content;
    var universalBOM = "\uFEFF";
    var a = window.document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/csv; charset=utf-8," +
        encodeURIComponent(universalBOM + csvString)
    );
    a.setAttribute("download", "Report.csv");
    window.document.body.appendChild(a);
    a.click();
  }


  async set_NewControlDevSess(id: any, dev_id: any, dev_number: any) {
    APP_STORAGE.devs.set_NewControlDevSess(APP_STORAGE.auth_form.getdt(), id, dev_id, dev_number)
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
      var tzoffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -8);
      sess.setSessPeriodStart(localISOTime);
      sess.setSessPeriodEnd(localISOTime); // => '2023-03-16T09:00'
    }

    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
  
        date.push(dev_sess[key]);

        
        count = Object.keys(dev_sess).length;

        if (document.getElementById(dev_sess[key].id)) {
          if (
            document.getElementById(dev_sess[key].id).id ===
            APP_STORAGE.sensors.getIdDevSess()
          ) {
            document.getElementById(dev_sess[key].id).style.backgroundColor =
              "#F3F8FD";
          } else if (
            document.getElementById(dev_sess[key].id).id !==
            APP_STORAGE.sensors.getIdDevSess()
          ) {
            document.getElementById(dev_sess[key].id).style.backgroundColor =
              "#fff";
          }
        }
      }
    }

    return (
      <React.Fragment>
        {date.length > 0 && (
          <Box sx={{ mt: "32px" }}>
            <>
              <Box
                className="session_pediod"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#AAAAAA",
                  }}
                >
                  Таблица сессий по периоду (кол-во: {count})
                </Typography>
              </Box>

            <DevSessTable />
              
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
        <ExportTable />
      </React.Fragment>
    );
  }
}
