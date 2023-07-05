import * as React from "react";
import { Box, TabScrollButton, TableFooter, Typography } from "@mui/material";

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

import ReportProblemIcon from "@mui/icons-material/ReportProblem";

interface IProps { }

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
          if (Math.abs(a[key]) >= 3) {
            data.push(
              <TableRow className="datarow" key={"_depth_key_" + a[key] + key}>
                <TableCell
                  align="center"
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  <CloseIcon sx={{ fontSize: "small", color: "red" }} />
                </TableCell>
              </TableRow>
            );
          } else if (Math.abs(a[key]) < 3) {
            data.push(
              <TableRow className="datarow" key={"_depth_key_" + a[key] + key}>
                <TableCell
                  align="center"
                  sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
                >
                  {" "}
                  <CheckIcon sx={{ fontSize: "small", color: "green" }} />
                </TableCell>
              </TableRow>
            );
          }
        }
      }
    }

    return (
      <>
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
                  <TableCell >Глубина</TableCell>
                  <TableCell align= 'center'>Контрольна сессия</TableCell>
                  <TableCell align= 'center'>Последняя сессия</TableCell>
                  <TableCell align= 'center'>Критичность</TableCell>
                </TableRow>
              </TableHead>

              {APP_STORAGE.sensors.getSessFirstLast().length > 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Table> 
                        <TableBody> 
                      {APP_STORAGE.sensors
                        .getSessFirstLast()
                        .map((row: any, i: any) => (
                          <TableRow
                            className="datarow"
                            key={"data_qd" + row.depth + row}
                          >
                            <TableCell
                              align="left"
                              sx={{
                                p: "4px",
                                color: "#002757",
                                fontWeight: "500",
                              }}
                            >
                              {" "}
                              {"" + row.depth}{" "}
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
                                color: "#002757",
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
                                color: "#002757",
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
                        <TableBody> 
                    {data}
                 
                        </TableBody> 
                        </Table> 
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: "flex", p: "24px" }}>
                        <Typography sx={{ color: "#266BF1" }}>
                          {" "}
                          Нет сессий на устройстве{" "}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
  }
}
