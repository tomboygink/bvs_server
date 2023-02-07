import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Divider,
} from "@mui/material";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface IProps {}

//Устройства
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async editDevice() {
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) 
    {
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

    return this.getValueCh(DevGr);
  }

  getValueCh(dgrs: TDevsGroup[]) {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueCh(gr_childs);

      parent.push(
        childs
        );
        for ( var key in gr_devs ){
        if ( ("_dev_id_key_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild())){
          APP_STORAGE.devs.setNumber(String(gr_devs[key].number));
          APP_STORAGE.devs.setName(String(gr_devs[key].name));
          APP_STORAGE.devs.setLongitude(String(gr_devs[key].longitude));
          APP_STORAGE.devs.setLatitude(String(gr_devs[key].latitude));
          APP_STORAGE.devs.setInfo(String(gr_devs[key].info));
          APP_STORAGE.devs.setChangeSensors(gr_devs[key].sensors.s);
          APP_STORAGE.devs.setId(String(gr_devs[key].id));
          APP_STORAGE.devs.setGroupDevId(String(gr_devs[key].group_dev_id));
          APP_STORAGE.devs.setCheckboxEd(gr_devs[key].deleted)
          
          APP_STORAGE.devs.setOpenModalChange(true);
      }
    }
    }
    return parent;
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {APP_STORAGE.devs_groups.setKeyOrg(a);}

  async OpenModal() {APP_STORAGE.devs.setOpenModal(true);}

  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] { //// отображаем выбранные устройства
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
              for ( var key in gr_devs ){
                  if ( ("_dev_id_key_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild())){
                    devs.push(
                        <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
    <Box sx = {{display:'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
    <Typography  sx ={{color: '#645757', fontWeight: '600'}}>Место расположения - {gr.g_name} </Typography> 
    {APP_STORAGE.getRoleWrite() === 2 && APP_STORAGE.getRoleRead() === 1 &&
    <div>
      <IconButton
        onClick={() => {APP_STORAGE.devs_groups.setOpen_menu(true)}}
        id='long-button555'
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        // onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={document.getElementById('long-button555')}
        open={APP_STORAGE.devs_groups.getOpen_menu()}
        onClose={() => {APP_STORAGE.devs_groups.setOpen_menu(false)}}
      
      >
       
          <MenuItem >
            <Typography onClick = { () => this.editDevice()}> Редактировать </Typography> 
          </MenuItem>
        
      </Menu>
    </div>
                  }
    </Box>
                        <Box sx ={{borderLeft: '1px solid #266bf18c', pl: '12px', borderRadius: '4px'}}>
                        <Box>
          <Typography sx ={{fontWeight: 500}}>{gr_devs[key].name}</Typography>
          <Typography sx={{fontSize: '12px', color: 'grey'}}>
                  Название устройства
           </Typography>  
          </Box>

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
                          value={gr_devs[key].longitude}
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
                          value={gr_devs[key].longitude}
                          />

                          
                      <TextField
                          variant="outlined"
                          margin="normal"
                          size="small"
                          required
                          fullWidth
                          id="Информация"
                          label="Информация"
                          autoFocus  
                          ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                          value={gr_devs[key].info}
                          />
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
    return (
      <React.Fragment>
        <Box
          className="wrapper-devs"
          sx={{
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
             width: '100%',
          }}
        >
          {/* <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список устройств
          </Typography> */}

          <Box
            sx={{
              
             // width: "1100px",
              
              
              
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: '100%'
            }}
          >
          {this.drawDevLocation()}
        </Box>
        </Box>
      </React.Fragment>
    );
  }
}
