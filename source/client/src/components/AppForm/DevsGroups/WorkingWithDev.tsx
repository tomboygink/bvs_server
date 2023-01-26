import React from "react";
import { observer } from "mobx-react";


import { Box, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";


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
    let sx1: any = '';
    let sx2: any = '';
 
      return (
        <React.Fragment>
    <> 
          
          <Box sx = {{ borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>

          <Box sx={{display: 'flex', alignItems: 'flex-start', pb: '12px'}}
           onClick={() => {
            this.DevLocation(1);
          }}>
            {/* <RoomOutlinedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/> */}
            <Typography sx ={{color: {sx1}}} >Расположение устройств</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'flex-start' ,  pb: '12px'}}
            onClick={() => {
              this.DevLocation(2);
            }}>
            {/* <FormatListNumberedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/> */}
            <Typography sx ={{color: {sx2}}}> Список устройств</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'flex-start' }}>
            {/* <FormatListNumberedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/> */}
            <Typography sx ={{color: {sx2}}}> Пользователи</Typography>
          </Box>
             
          <Box className="exit" sx={{display: 'flex', alignItems: 'flex-start', mt : '210%' , justifyContent: 'center'}}>
            {/* <FormatListNumberedIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/> */}
            <Typography sx ={{color: '#000000', fontSize: '20px', lineHeight: '28px'}}> Выход</Typography>
          </Box>

          </Box>

          </>
         
        </React.Fragment>
      );
  }
}
