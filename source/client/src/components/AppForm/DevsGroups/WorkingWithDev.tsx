import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography  } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

interface IProps {}

//Устройства
@observer
export class WorkingWithDev extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async DevLocation (e:any){
    APP_STORAGE.devs_groups.setMiddleForm(e);
    APP_STORAGE.devs_groups.get_DevsGroups("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
   /// APP_STORAGE.devs.get_Devs("sess_id", APP_STORAGE.auth_form.getdt());
  }
  render(): React.ReactNode {
    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem', mr: '32px'}}> 
          <Typography sx={{fontWeight: '500' , pb: '20px'}}>Работа с утройствами</Typography>
          
          <Box sx = {{width: '290px',  background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>

          <Box sx={{display: 'flex', alignItems: 'flex-start', pb: '31px'}}
           onClick={() => {
            this.DevLocation(1);
          }}>
            <RoomOutlinedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/>
            <Typography >Расположение устройств</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'flex-start' }}
            onClick={() => {
              this.DevLocation(2);
            }}>
            <FormatListNumberedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/>
            <Typography>Список устройств</Typography>
          </Box>
            
          </Box>

          </Box>
         
        </React.Fragment>
      );
  }
}
