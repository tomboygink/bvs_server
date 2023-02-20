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

interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
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
    var sensors = []; ////// отображаем сенсоры
    let sess = APP_STORAGE.sensors;
    let dev_sess;
    if (sess.getDevSession) {
      dev_sess = toJS(sess.getDevSession());

      for (var key in dev_sess) {
        sensors.push(
          <>
            <TableRow key={"sensors_id" + dev_sess[key].id}>
              <TableCell>{dev_sess[key].id}</TableCell>
              <TableCell>[{"" + dev_sess[key].dev_number}] </TableCell>
            </TableRow>
          </>
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
          <TableContainer>
            <Table aria-label="caption table">
              <TableBody>
                {APP_STORAGE.sensors.getOpenDevsess() === true && (
                  <TableRow key={"sensors_id" + 98}>
                    <TableCell colSpan={2} sx={{ color: "#aaa" }}>
                      СЕССИИ ЗА ПЕРИОД:
                    </TableCell>
                    <TableCell sx={{ width: "80px" }}></TableCell>
                  </TableRow>
                )}
                {sensors}
              </TableBody>
            </Table>
          </TableContainer>
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
