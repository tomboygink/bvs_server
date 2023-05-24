import * as React from "react";
import { Box, Typography} from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import CommitIcon from '@mui/icons-material/Commit';

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";

import Battery0BarOutlinedIcon from '@mui/icons-material/Battery0BarOutlined';


interface IProps {}

//Компонент формы приложения
@observer
export class Sensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal() {
    APP_STORAGE.devs.setOpenModal(true);
  }

  setAnchorEl(a: string) {
    APP_STORAGE.sensors.setAnchorEl(a);
  }

  async SortDescSensors(a: string) {
    if (a === "0") {
      APP_STORAGE.sensors.setActiveButtonSort("sort-sensors");
      APP_STORAGE.sensors.setActiveButtonSortDesc("sort");
    }
    if (a === "1") {
      APP_STORAGE.sensors.setActiveButtonSortDesc("sort-sensors-desc");
      APP_STORAGE.sensors.setActiveButtonSort("sort");
    }
    APP_STORAGE.sensors.setSortDesc(a);
    this.drawDevLocation();
  }

  drawSensors(dgrs: TDevsGroup[]): React.ReactNode[] {
    var sensors: React.ReactNode[] = new Array(); ////// отображаем сенсоры
    var sort_array: any = [];
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      for (var i in gr_devs) {

        if ("_dev_id_key_" + gr_devs[i].id === APP_STORAGE.devs.getIdChild() &&
          APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
          APP_STORAGE.sensors.getSortDesc() === ""
        ) {
          var obj = JSON.parse(JSON.stringify(gr_devs[i].sensors.s));
          const uniqueChars = obj.reduce((o: any, i: any) => {
            if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
              o.push(i);
            }
            return o;
          }, []);

          for (var key in uniqueChars) {
            if (uniqueChars) {
              sort_array.push(uniqueChars[key].depth);
            }
            APP_STORAGE.setdevs_group_move(sort_array);
           
            if (gr_devs[i].deleted === true) {
              sensors.push(
                <>
                  <TableRow key={"sensors_id" + uniqueChars[key].depth}>
                    <TableCell>
                      <SensorsIcon fontSize="small" sx={{ color: "#808080" }} />
                    </TableCell>
                    <TableCell>[00{key}]</TableCell>
                    <TableCell>[{"" + uniqueChars[key].depth}] </TableCell>
                  </TableRow>
                </>
              );
            }

            if (gr_devs[i].deleted === false) {
              sensors.push(
                <TableRow key={"sensors_id" + uniqueChars[key].depth}>
                  <TableCell sx={{borderBottom: 'none'}}>
                    <SensorsIcon fontSize="small" sx={{ color: "#5be95b" }} />
                  </TableCell>
                  <TableCell sx={{borderBottom: 'none'}}>[00{key}]</TableCell>
                  <TableCell sx={{ fontWeight: "700" , borderBottom: 'none'}}>
                    [{"" + uniqueChars[key].depth}]{" "}
                  </TableCell>
                </TableRow>
              );
            }
          }
        }


        //////////////////////////////Сортировка..................................................................

        if ("_dev_id_key_" + gr_devs[i].id === APP_STORAGE.devs.getIdChild() &&
          APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
          APP_STORAGE.sensors.getSortDesc() === "1"
        ) {

          sort_array = APP_STORAGE.getdevs_group_move();

          for (var y in sort_array.sort((a: any, b: any) => b - a)) {
            if (gr_devs[i].deleted === true) {
              sensors.push(
                <TableRow key={"sensors_id" + sort_array[y]}>
                  <TableCell>
                    <SensorsIcon fontSize="small" sx={{ color: "#808080" }} />
                  </TableCell>
                  <TableCell>[00{key}]</TableCell>
                  <TableCell>[{"" + sort_array[y]}] </TableCell>
                </TableRow>
              );
            }

            if (gr_devs[i].deleted === false) {
              sensors.push(
                <TableRow key={"sensors_id" + sort_array[y]}>
                  <TableCell>
                    <SensorsIcon fontSize="small" sx={{ color: "#5be95b" }} />
                  </TableCell>
                  <TableCell>[00{key}]</TableCell>
                  <TableCell sx={{ fontWeight: "700" }}>
                    [{"" + sort_array[y]}]{" "}
                  </TableCell>
                </TableRow>
              );
            }
          }
        }

        if (
          "_dev_id_key_" + gr_devs[i].id === APP_STORAGE.devs.getIdChild() &&
          APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
          APP_STORAGE.sensors.getSortDesc() === "0"
        ) {
          sort_array = APP_STORAGE.getdevs_group_move();
          for (var k in sort_array.sort()) {
            if (gr_devs[i].deleted === true) {
              sensors.push(
                <TableRow key={"sensors_id" + sort_array[k]}>
                  <TableCell>
                    <SensorsIcon fontSize="small" sx={{ color: "#808080" }} />
                  </TableCell>
                  <TableCell>[00{key}]</TableCell>
                  <TableCell>[{"" + sort_array[k]}] </TableCell>
                </TableRow>
              );
            }

            if (gr_devs[i].deleted === false) {
              sensors.push(
                <TableRow key={"sensors_id" + sort_array[k]}>
                  <TableCell>
                    <SensorsIcon fontSize="small" sx={{ color: "#5be95b" }} />
                  </TableCell>
                  <TableCell>[00{key}]</TableCell>
                  <TableCell sx={{ fontWeight: "700" }}>
                    [{"" + sort_array[k]}]{" "}
                  </TableCell>
                </TableRow>
              );
            }
          }
        }
      }

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawSensors(gr_childs);

      sensors.push(childs);
    }
    return sensors;
  }

  drawDevLocation(): React.ReactNode {
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawSensors(DevGr);
  }


  render(): React.ReactNode {
    return (
      <>
       {APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
       <Box sx ={{display: 'flex', justifyContent: 'space-between',  color: '#111111'}}> 
           <Typography sx={{ fontWeight: "500" , color: '#0D1C52', mb : '12px' }}>   Список сенсоров </Typography>
                      <Box sx={{ width: "80px" }}>

                        <ArrowDownwardIcon
                          className={APP_STORAGE.sensors.getActiveButtonSort()}
                          fontSize="small"
                          sx={{ p: "2px" }}
                          onClick={() => {
                            this.SortDescSensors("0");
                          }}
                        />

                        <ArrowUpwardIcon
                          className={APP_STORAGE.sensors.getActiveButtonSortDesc()}
                          fontSize="small"
                          sx={{ p: "2px" }}
                          onClick={() => {
                            this.SortDescSensors("1");
                          }}
                        /> 

                      </Box> 
                      </Box>}
        <Box
          className=" sensors"
          sx={{
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxHeight: '300px',
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            <TableContainer className="table_container sensors">
              <Table aria-label="caption table">
                <TableBody className="table_body sensors">
                  {this.drawDevLocation()}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

{APP_STORAGE.sensors.getTimeDevSessFirst() && 
<>
 <Typography sx={{ fontWeight: "500" , color: '#0D1C52', mb : '12px', mt: '40px' }}>  Дополнительная информация </Typography>


 <Box
    sx={{
     width: "100%",
     height: '100%',
     background: "#fff",
     borderRadius: "4px",
     display: "flex",
     padding: '16px',
     flexDirection: 'column',
     
     overflow: "auto",
   }}
 >

<Box  sx = {{fontSize: '15px', color:'#000', display: 'flex', pb: '12px', justifyContent: 'flex-start', alignItems: 'center'}} ><CommitIcon sx ={{color: '#0BF1CA'}}/> {APP_STORAGE.sensors.getTimeDevSessFirst().replace('T',' ')} <Typography sx ={{color: '#808080', fontSize: '12px'}}> (первая сессия)  </Typography> </Box>
<Box sx = {{fontSize: '15px', color:'#000', display: 'flex' , pb: '12px' , justifyContent: 'flex-start', alignItems: 'center'}} ><CommitIcon sx ={{color: '#A178FB'}}/>  {APP_STORAGE.sensors.getTimeDevSessLast().replace('T',' ')} <Typography sx ={{color: '#808080', fontSize: '12px'}}> (последняя сессия)  </Typography></Box>
{APP_STORAGE.sensors.getChoseSessTime() && 
       <Box sx = {{fontSize: '15px', color:'#000', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}} ><CommitIcon sx ={{color: '#FD8A04'}}/>  {APP_STORAGE.sensors.getChoseSessTime().replace('T', ' ')} <Typography sx ={{color: '#808080', fontSize: '12px'}}> (выбранная сесия)  </Typography></Box>
     }


 </Box>
 </>
}
       
      </>
    );
  }
}
