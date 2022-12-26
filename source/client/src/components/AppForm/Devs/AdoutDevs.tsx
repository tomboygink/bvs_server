import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography  } from "@mui/material";
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
    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
           
        <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem'}}> 
          <Typography sx={{fontWeight: '500' , pb: '20px'}}>Данные по устройствам</Typography>
          {/* ******************************************************************************************************************************* */} 
          <Box sx = {{width: '790px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
          <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>Устройство - 5005</Typography>
            <Typography sx={{color: '#AAAAAA', fontSize: '12px'}}>Заводской номер - 5005</Typography> 
          </Box>
          <Box sx={{mb: '8px'}}>
            <Typography sx={{fontWeight: '600'}}>  Выборка сессий устройства 5005 по периоду </Typography>
          </Box>
          <Box sx={{background: '#F1F5FC', width: '180px', color: '#000', p: '8px', borderRadius: '4px'}}>
           <Typography> Установить период</Typography>
          </Box> 
          </Box>
          {/* ******************************************************************************************************************************* */}
          <Box sx = {{width: '790px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
            {/* ******************************************************************************************************************************* */}
          <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>Устройство - 5005</Typography>
            <Typography sx={{color: '#AAAAAA', fontSize: '12px'}}>Заводской номер - 5005</Typography> 
          </Box>
          <Box sx={{mb: '8px'}}>
            <Typography sx={{fontWeight: '600'}}>  Выборка сессий устройства 5005 по периоду </Typography>
          </Box>
          <Box sx={{background: '#F1F5FC', width: '180px', color: '#000', p: '8px', borderRadius: '4px'}}>
          <Typography> Установить период</Typography>
          </Box>
          {/* ******************************************************************************************************************************* */}
          </Box>

          </Box>
         
        </React.Fragment>
      );
  }
}
