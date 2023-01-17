import * as React from "react";
import { Box, Alert, Typography, TextField } from "@mui/material";


import SensorsIcon from "@mui/icons-material/Sensors";


import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


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

  async SelectedOrg(a: any) {//// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal(){
    APP_STORAGE.devs.setOpenModal(true);
  }

  render(): React.ReactNode {
    let devs = [];
    let sensors = [];
    if (APP_STORAGE.devs.getDevs()) {

      devs = JSON.parse(JSON.stringify(APP_STORAGE.devs.getDevs()));
   
      
      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];

          console.log('sensors1', JSON.parse(JSON.stringify(a.sensors)) )

          for (var key in JSON.parse(JSON.stringify(a.sensors))) {
             if (JSON.parse(JSON.stringify(a.sensors)).hasOwnProperty(key)) {
           let s = JSON.parse(JSON.stringify(a.sensors))[key];
              console.log('s1', s[0]);
              
                 sensors.push(
                  <TableRow key= {s[0]}>
                  <TableCell sx={{display: 'flex', fontWeight: '700', border: 'none'}} align="left"><SensorsIcon fontSize="small" sx={{pr: '9px', color: '#5be95b'}} />[{s[0]} , {s[1]}, {s[2]}] </TableCell>
                  <TableCell align="left" sx= {{color: '#038F54'}}><AddIcon fontSize="small"/></TableCell>
                  <TableCell align="left" sx = {{ color : '#1976D2'}}><ModeEditOutlineOutlinedIcon fontSize="small"/></TableCell>
                  <TableCell align="left" sx ={{color : '#FF4848'}}><DeleteOutlineOutlinedIcon fontSize="small" /></TableCell>
                </TableRow>
                 )
        }
         }
        }
      }
     }
   


    return (
      <React.Fragment>
      <Box
        className="wrapper-devs"
        sx={{
          mt: "44px",
          display: "flex",
          flexDirection: "column;",
          alignItems: "flex-start;",
          ml: "1rem",
          mr: "32px",
        }}
      >
        <Typography sx={{ fontWeight: "500", pb: "20px" }}>
          Список сенсоров
        </Typography>
        <Box 
          sx={{
            width: "290px",
            p: "25px",
            background: '#fff', 
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
            <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: ' 100%' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
        </Box>
        <Box
          sx={{
            width: "290px",
            p: "25px",
            mt: '22px',
            background: '#fff', 
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
        <TableContainer >
      <Table aria-label="caption table">
     
       
        <TableBody>
         {sensors}
  
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
      </Box>
    </React.Fragment>
    );
  }
}
