import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import {
  Box,
  Paper,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";

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

          let sess_data = senso.s.sort(
            (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
          );
          ses_depth.push(
            sess_data.map((row: any, i: any) => (
              <React.Fragment key={"data_" + row.data + row.depth}>
                <TableRow className="datarow">
                  <TableCell
                    align="left"
                    sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                  >
                    {" "}
                    {"" + row.depth}{" "}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          );

          ses_date.push(
            senso.s.map((row: any, i: any) => (
              <React.Fragment key={"data_qd" + row.data + row.depth}>
                <TableRow className="datarow">
                  <TableCell
                    align="center"
                    sx={{ p: "4px", color: "#FD8A04", fontWeight: "500" }}
                  >
                    {" "}
                    {"" + row.data}{" "}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          );
        }
      }
    }

    return (
      <React.Fragment>
        {ses_depth.length > 0 && (
          <Paper
            style={{ maxHeight: 650, overflow: "auto" }}
            className="paper_table"
            elevation={1}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Глубина</TableCell>
                    <TableCell align="center">Контрольная сессия</TableCell>
                    <TableCell align="center">Последняя сессия</TableCell>
                    <TableCell align="center">Выбранная сессия</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Table>
                        <TableBody>{ses_depth}</TableBody>
                      </Table>
                    </TableCell>

                    <TableCell>
                      <Table>
                        <TableBody>
                          {APP_STORAGE.sensors
                            .getSess_first()
                            .map((row: any, i: any) => (
                              <TableRow
                                className="datarow"
                                key={"data_qds" + row.data_f + i + row.data_f}
                              >
                                <TableCell
                                  align="center"
                                  sx={{
                                    p: "4px",
                                    color: "#00b394",
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  {"" + row.data_f}{" "}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableCell>

                    <TableCell>
                      <Table>
                        <TableBody>
                          {APP_STORAGE.sensors
                            .getSessFirstLast()
                            .map((row: any, i: any) => (
                              <TableRow
                                className="datarow"
                                key={"data_qdsadsd1212313" + row.data_s + i}
                              >
                                <TableCell
                                  align="center"
                                  sx={{
                                    p: "4px",
                                    color: "#9566FB",
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  {"" + row.data_s}{" "}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableCell>

                    <TableCell>
                      <Table>
                        <TableBody>{ses_date}</TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {ses_depth.length === 0 && (
          <>
            <Typography sx={{ color: "#266BF1" }}>
              {" "}
              Ничего не выбрано
            </Typography>
          </>
        )}
      </React.Fragment>
    );
  }
}
