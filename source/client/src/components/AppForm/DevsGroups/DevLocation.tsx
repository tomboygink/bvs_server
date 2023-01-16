import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography  } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

 async OpenModal(e:any) {
  APP_STORAGE.devs_groups.setParentId(e)
  APP_STORAGE.devs_groups.setOpenModal(true);
  APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
 }
 
  render(): React.ReactNode {
    let devs = [];
    let dev_form = [];
    //let parent_g = [];
    
    if (APP_STORAGE.devs_groups.getDevsGroups()) {
        devs = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()));
        for (var key in devs) {
          if (devs.hasOwnProperty(key)) {
            let a = devs[key];

            

         dev_form.push(
        <Box key={a.id} sx = {{width: '1100px;', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>

        <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            
        <Typography>{a.g_name}</Typography>
        {a.id} {a.parent_id}
        <Typography sx={{color: '#AAAAAA', fontSize: '12px'}}>место расположения устройства</Typography> 
        </Box>
       
        <Box sx= {{display: 'flex'}}>
        <Box sx={{mb: '8px', mr: '14px'}}>
        <Typography sx={{fontWeight: '600'}}>  Долгота - {a.longitude} </Typography>
        </Box>
        <Box sx={{mb: '8px'}}>
        <Typography sx={{fontWeight: '600'}}>  Широта - {a.latitude}</Typography>
        </Box>
        </Box>

  <Box sx={{display: 'flex'}}> 
        <Box sx={{background: '#F1F5FC', width: '180px', color: '#000', p: '8px', pl: '20px' , mr: '20px', borderRadius: '4px'}}
        onClick={() => this.OpenModal(a.id)}>
        <Typography> Добавить</Typography>
        </Box>

        {/* <Box sx={{background: '#eee', width: '180px', color: '#787878', p: '8px', pl: '20px' , borderRadius: '4px'}}
        onClick={() => this.OpenModal()}>
        <Typography> Изменить</Typography>
        </Box> */}
  </Box>
        </Box>
              )
            
          }
        }
      }

      return (
        <React.Fragment>
           
        <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem'}}> 
        <Typography sx={{fontWeight: '500' , pb: '20px'}}>Расположение устройств</Typography>
          {/* ******************************************************************************************************************************* */} 

           {dev_form}
        
          </Box>


  {/* ******************************************************************************************************************************* */}
          <Box className="wrapper-devs" sx={{  display: 'flex', flexDirection: 'column;', alignItems: 'flex-end;', ml: '1rem'}}> 
          <Box sx = {{width: '790px', background: '#fff', pl: '25px',  pr: '25px', pt: '8px', pb: '8px',borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center',  alignItems: 'flex-end;', mb: '16px'}}>
          <Box 
             sx={{background: '#F1F5FC',color: '#000', width: '180px', p: '3px', pl: '20px'  ,borderRadius: '4px'}}
             onClick={() => this.OpenModal(0)}
             >
           <Typography> Добавить новое</Typography>  
          </Box>  
          </Box>
          {/* ******************************************************************************************************************************* */}
          

          </Box>
         
        </React.Fragment>
      );
  }
}
