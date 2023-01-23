import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography , TextField, Divider,  TextareaAutosize} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import LongMenu from './Menu'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

 async OpenModal(e:any) {
  alert(e)
  APP_STORAGE.devs_groups.setParentId(e)
  APP_STORAGE.devs_groups.setOpenModal(true);
  APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
 }
 
  render(): React.ReactNode {
    let devs_g = [];
    let dev_group = [];
    


if (APP_STORAGE.devs_groups.getDevsGroups()) {
  devs_g = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );

  for (var key in devs_g) {
    if (devs_g.hasOwnProperty(key)) {
      let a = devs_g[key];
      let b = JSON.parse(a);
      for (let i=0; i < b.childs.length; i++){
      if( APP_STORAGE.devs.getIdChild() === b.childs[i].group.id) { 
        dev_group.push(
        <Box key={b.childs[i].group.id} sx = {{width: '1100px;', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>

        <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
        <Box>
        <Typography sx = {{fontWeight: '500', fontSize: '22px'}}>{b.childs[i].group.g_name}</Typography>
        <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Место расположения устройства
         </Typography>  
        </Box>
       
        <LongMenu/>


        </Box>
            <Box
              sx={{
                display: "flex",
                borderRadius: "4px",
                flexDirection: 'column',
              }}
            >
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
                        value={b.childs[i].group.longitude}
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
                        value={b.childs[i].group.latitude}
                    /> 
          </Box>

          



  <Box sx={{display: 'flex'}}> 
        <Box sx={{background: '#4891FF', width: '180px', color: '#fff', p: '4px', borderRadius: '4px'}}
        onClick={() => this.OpenModal(b.childs[i].group.id)}
        >
          
        <Box sx ={{display: 'flex'}} > <AddLocationAltIcon fontSize ="small" sx = {{background: '#73ABFF', p: '4px', borderRadius: '4px', color: '#fff', mr: '4px'}}/>
        <Typography sx ={{alignSelf: 'center'}}>  Добавить</Typography>
       
        </Box>
        </Box>

       </Box>
        </Box>

        
              )
      }

        if (b.childs[i].childs.length){
             for (let a = 0; a<b.childs[i].childs.length ; a ++){
                if (APP_STORAGE.devs.getIdChild() === b.childs[i].childs[a].group.id){
                  dev_group.push(
                    <Box key={b.childs[i].group.id} sx = {{width: '1100px;', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>

        <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
        <Box>
        <Typography sx = {{fontWeight: '500', fontSize: '22px'}}>{b.childs[i].childs[a].group.g_name}</Typography>
        <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Место расположения устройства
         </Typography>  
        </Box>
       
        <LongMenu/>


        </Box>
            <Box
              sx={{
                display: "flex",
                borderRadius: "4px",
                flexDirection: 'column',
              }}
            >
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
                        value={b.childs[i].childs[a].group.longitude}
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
                        value={b.childs[i].childs[a].group.latitude}
                    /> 
          </Box>

          



  <Box sx={{display: 'flex'}}> 
        <Box sx={{background: '#4891FF', width: '180px', color: '#fff', p: '4px', borderRadius: '4px'}}
        onClick={() => this.OpenModal(b.childs[i].childs[a].group.id)}
        >
          
        <Box sx ={{display: 'flex'}} > <AddLocationAltIcon fontSize ="small" sx = {{background: '#73ABFF', p: '4px', borderRadius: '4px', color: '#fff', mr: '4px'}}/>
        <Typography sx ={{alignSelf: 'center'}}>  Добавить</Typography>
       
        </Box>
        </Box>

       </Box>
        </Box>
                  )
                 
                }
             
             }
          }
  
      console.log('child ',b.childs[i].childs);
        
      }
      

    }
  }
}







      return (
        <React.Fragment>
           
        <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem'}}> 
        <Typography sx={{fontWeight: '500' , pb: '20px'}}>Расположение устройств</Typography>
          {/* ******************************************************************************************************************************* */} 

           {dev_group}
        
          </Box>


  {/* ******************************************************************************************************************************* */}
          <Box className="wrapper-devs" sx={{  display: 'flex', flexDirection: 'column;', alignItems: 'flex-end;', ml: '1rem', position: 'absolute', bottom : 0}}> 
          <Box sx = {{width: '1100px', background: '#fff', pl: '25px',  pr: '25px', pt: '8px', pb: '8px',borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center',  alignItems: 'flex-end;', mb: '16px'}}>
          <Box 
             sx={{color: '#000', width: '180px', p: '3px', pl: '20px'  ,borderRadius: '4px'}}
             onClick={() => this.OpenModal(0)}
             >
           <Typography> Добавить новое </Typography>  
          </Box>  
          </Box>
          {/* ******************************************************************************************************************************* */}
          

          </Box>
         
        </React.Fragment>
      );
  }
}
