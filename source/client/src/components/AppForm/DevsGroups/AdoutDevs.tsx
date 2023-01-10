import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography, TextField} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface IProps {}

//Устройства
@observer
export class AdoutDevs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    let devs_discripst = [];
    let devs = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );
    for (var key in devs) {
      if (devs.hasOwnProperty(key)) {
        let a = devs[key];

        if (a.id === APP_STORAGE.devs.getIdDevs()) {
          // APP_STORAGE.devs.setItem(a.g_name)
          console.log(a.parent_id);
          devs_discripst.push(
            <Box sx = {{width: '790px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
          <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>{a.g_name}</Typography>
            <Typography sx={{color: '#AAAAAA', fontSize: '12px'}}>Заводской номер - 5005</Typography> 
          </Box>
          <Box sx={{mb: '8px'}}>
            <Typography sx={{fontWeight: '600'}}>  Выборка сессий устройства 5005 по периоду </Typography>
          </Box>
         
        <Box sx = {{display: 'flex'}}>
        <TextField
        size = 'small'
        id="datetime-local"
        label="Начало периода"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        sx={{ width: 250 , mr: '22px', mt: '12px', mb: '12px' }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
       size = 'small'
        id="datetime-local"
        label="Окончание периода"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        sx={{ width: 250 , mt: '12px', mb: '12px' }}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </Box>
  
          <Box sx={{background: '#F1F5FC', width: '180px', color: '#000', p: '8px', borderRadius: '4px'}}>
           <Typography> Установить период</Typography>
          </Box> 
          </Box>
          );
        }
      }
    }
    
    if (APP_STORAGE.auth_form.getUser())
      return (

        <React.Fragment>
           
          <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem'}}> 
          <Typography sx={{fontWeight: '500' , pb: '20px'}}>Данные по устройствам</Typography>
          {/* ******************************************************************************************************************************* */} 
          {devs_discripst}
          </Box>
        </React.Fragment>
      );
  }
}
