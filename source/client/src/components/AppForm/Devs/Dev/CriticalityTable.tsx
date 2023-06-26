import * as React from "react";
import { Box, TableFooter, Typography } from "@mui/material";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import ReportProblemIcon from '@mui/icons-material/ReportProblem';


interface IProps {}

//Компонент формы приложения
@observer
export class CriticalityTable extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    let raznitca;
    let a: number[] = [];
    let data = [];

    if (APP_STORAGE.sensors.getSessFirstLast()) {
      for (var i in toJS(APP_STORAGE.sensors.getSessFirstLast())) {
        raznitca =
          APP_STORAGE.sensors.getSessFirstLast()[i].data_f -
          APP_STORAGE.sensors.getSessFirstLast()[i].data_s;
        a.push(raznitca);
      }

      if (a.length) {
        for (var key in a) {
          if (a[key] >= 3) {
            data.push(
              <React.Fragment key={"_depth_key_" + a[key] + key}>
                <TableCell align="left">
                  {" "}
                  <CloseIcon sx={{ fontSize: "small", color: "red" }} />{" "}
                </TableCell>
              </React.Fragment>
            );
          } else if (a[key] < 3) {
            data.push(
              <React.Fragment key={"_depth_key_" + a[key] + key}>
                <TableCell align="center">
                  {" "}
                  <CheckIcon sx={{ fontSize: "small", color: "green" }} />{" "}
                </TableCell>
              </React.Fragment>
            );
          }
        }
      }
    }

    return (
      <>
        <Typography
          sx={{ fontWeight: "500", color: "#0D1C52", mb: "12px", mt: "40px" }}
        >
          {" "}
         Контроль критичности отклонений{" "}
        </Typography>

        <Paper style={{ maxHeight: 200, overflow: "auto" }} elevation={1}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Глубина</TableCell>
                  {APP_STORAGE.sensors
                    .getSessFirstLast()
                    .map((row: any, i: any) => (
                      <React.Fragment
                        key={"data_qd" + row.depth + row}
                      >
                        <TableCell
                          align="left"
                          sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                        >
                          {" "}
                          {"" + row.depth}{" "}
                        </TableCell>
                      </React.Fragment>
                    ))}
                </TableRow>

                <TableRow sx={{ background: "#EDF4FB" }}>
                  <TableCell align="center" colSpan={a.length + 1}>
                    Сессия
                  </TableCell>
                  {/* <TableCell align="center" >Температура</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key="key"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    align="left"
                    sx={{ fontWeight: "500" }}
                  >
                    контрольная
                  </TableCell>
                  {APP_STORAGE.sensors
                    .getSess_first()
                    .map((row: any, i: any) => (
                      <React.Fragment
                        key={
                          "data_qds" + row.data_f + i + row.data_f
                        }
                      >
                        <TableCell
                          align="center"
                          sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                        >
                          {" "}
                          {"" + row.data_f}{" "}
                        </TableCell>
                      </React.Fragment>
                    ))}
                </TableRow>

                <TableRow
                  key="key11"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    align="left"
                    sx={{ fontWeight: "500" }}
                  >
                    последняя
                  </TableCell>
                  {APP_STORAGE.sensors
                    .getSessFirstLast()
                    .map((row: any, i: any) => (
                      <React.Fragment
                        key={"data_qdsadsd1212313" + row.data_s + i}
                      >
                        <TableCell
                          align="center"
                          sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                        >
                          {" "}
                          {"" + row.data_s}{" "}
                        </TableCell>
                      </React.Fragment>
                    ))}
                </TableRow>
              </TableBody>

              <TableFooter>
                <TableRow
                  key="key11"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    align="left"
                    sx={{ fontWeight: "500" }}
                  ></TableCell>
                  {data}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
  }
}
