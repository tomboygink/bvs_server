import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography , TextField, Divider,  TextareaAutosize} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import LongMenu from './Menu'

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

          if(  APP_STORAGE.devs.getIdChild() === a.id) { 

         dev_form.push(
        <Box key={a.id} sx = {{width: '1100px;', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>

        <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>  
        <Typography>{a.g_name}</Typography>
        <LongMenu/>
        </Box>
       
        {/* <Box sx= {{display: 'flex'}}>
        <Box sx={{mb: '8px', mr: '14px'}}>
        <Typography sx={{fontWeight: '600'}}>  Долгота - {a.longitude} </Typography>
        </Box>
        <Box sx={{mb: '8px'}}>
        <Typography sx={{fontWeight: '600'}}>  Широта - {a.latitude}</Typography>
        </Box>
        </Box> */}
            
            <Box
              sx={{
                display: "flex",
                borderRadius: "4px",
                flexDirection: 'column',
                p: "18px",
              }}
            >
     

                    
          <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="Наименование"
                        label="Наименование"
                        autoFocus  
                        ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={a.g_name}
                    />
    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="Долгота"
                        label="Долгота"
                        autoFocus  
                        ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={a.longitude}
                    />

<TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="Широта"
                        label="Широта"
                        autoFocus  
                        ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={a.latitude}
                    />

<Divider sx={{ padding: "12px" }} />
          <Typography sx={{ color: "#999999" }} variant="caption">
            Информация:
          </Typography>

          <TextareaAutosize
            className="info"
            aria-label="minimum height"
            minRows={4}
            style={{ width: "100%" }}
         
            value={a.info}
          />
        {/* <Typography>Название устройства - {a.name}</Typography>
        <Typography>Долгота - {a.latitude}</Typography> 
        <Typography>Широта - {a.longitude}</Typography>
        <Typography>Информация - {a.info}</Typography>  */}
        
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
          <Box sx = {{width: '1100px', background: '#fff', pl: '25px',  pr: '25px', pt: '8px', pb: '8px',borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center',  alignItems: 'flex-end;', mb: '16px'}}>
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
