import { observer } from "mobx-react";
import React from "react";


import { Box, TextField, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";


import { TDevsGroup, TDGroup } from "../../../storage/components/Devs/DevEntityes";

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface IProps {}

//Устройства
@observer
export class AdoutDevs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] { //// отображаем выбранные устройства
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
              for ( var key in gr_devs ){
                
                  if ( ("_dev_id_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild())){
                    
                    devs.push(
                        <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                                <Box key = {gr_devs[key].id} sx = {{width: '1100px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
          <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>{gr_devs[key].name}</Typography>
            <Typography sx={{color: '#AAAAAA', fontSize: '12px'}}>Заводской номер - {gr_devs[key].number}</Typography> 
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
                        </React.Fragment>
                      );
                  } 
              }

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevs(gr_childs);

      devs.push(
       childs
      );
    }
    return devs;
  }

  drawDevLocation(): React.ReactNode { /// формируем массив
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
    }

    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a);

        if (root.childs.length > 0) {
          for (let i = 0; i < root.childs.length; i++) {
            DevGr.push(root.childs[i]);
          }
        }
      }
    }

    return this.drawDevs(DevGr);  /// передаем сформированные данные

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
          devs_discripst.push(
            <Box key = {a.id} sx = {{width: '1100px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
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
    
  if (APP_STORAGE.devs.getIdDevs()===''){
    devs_discripst.push(
      <Box key = '1' sx = {{width: '1100px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
       <Typography> Необходимо выбрать устройство</Typography>
      </Box>

    )
  }

    if (APP_STORAGE.auth_form.getUser())
      return (

        <React.Fragment> 
          <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem'}}> 
          <Typography sx={{fontWeight: '500' , pb: '20px'}}>Данные по устройствам</Typography>
          {/* ******************************************************************************************************************************* */}
          {this.drawDevLocation()}
          {devs_discripst}
          </Box>
        </React.Fragment>
      );
  }
}
