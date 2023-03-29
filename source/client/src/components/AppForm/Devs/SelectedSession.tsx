import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow";

interface IProps {}

//Устройства
@observer
export class SelectedSession extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
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
      }
    }

    return (
      <React.Fragment>
        {ses_depth.length > 0 && (
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
        )}
      </React.Fragment>
    );
  }
}
