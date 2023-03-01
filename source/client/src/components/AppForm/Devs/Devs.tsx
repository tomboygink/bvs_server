import * as React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../storage/AppStorage";

import { Box, Typography, TextField, ListItemIcon, Menu , MenuItem, Link, Button} from "@mui/material";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";



interface IProps {
}



@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async editDevice(a:any) { /////////////////////////////////////////Кнопка редактирования
    APP_STORAGE.devs.setMenu_devs(a);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.PassValueEditForm(DevGr); 
  }



  PassValueEditForm(dgrs: TDevsGroup[]) {
    var dev = APP_STORAGE.devs;
    var devGr = APP_STORAGE.devs_groups;
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.PassValueEditForm(gr_childs);

      parent.push(childs);
      for (var key in gr_devs) {
        if (
          "_dev_id_key_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild()
        ) {
          dev.setNumber(String(gr_devs[key].number));
          devGr.setParentId('key-09');
          dev.setName(String(gr_devs[key].name));
          dev.setLongitude(String(gr_devs[key].longitude));
          dev.setLatitude(String(gr_devs[key].latitude));
          dev.setInfo(String(gr_devs[key].info));
          dev.setChangeSensors(gr_devs[key].sensors.s);
          dev.setId(String(gr_devs[key].id));
          dev.setGroupDevId(String(gr_devs[key].group_dev_id));
          dev.setCheckboxEd(gr_devs[key].deleted);
            

      if(dev.getMenu_devs() === '1')
          {dev.setOpenModalChange(true);
            devGr.setOpen_menu(false);
          }
      if(dev.getMenu_devs() === '2'){
        devGr.setOpenModalMoveDevsGr(true);
        devGr.setOpen_menu(false);
          }
          
        }
      }
    }
    return parent;
  }



  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] {
    var dev = APP_STORAGE.devs;
    var devGr = APP_STORAGE.devs_groups;
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;


      for (var key in gr_devs) { ////////////////////////////////// Все устройства

            if ("_dev_id_key_" + gr_devs[key].id === dev.getIdChild()) {
              APP_STORAGE.sensors.setNumber(gr_devs[key].number);
                  if (gr_devs[key].deleted === true) {

                                    devs.push(
                                    <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>

                                    <Box className="wrappert-devs">
                                    <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      width: "100%",
                                      alignItems: "center",
                                    }}
                                    >

                                    <Typography sx={{ fontSize : '12px' ,  color: '#AAAAAA'}}>
                                    Место расположения устройства - {gr.g_name} 
                                    </Typography>
                                    
                                    {APP_STORAGE.getRoleWrite() === 2 &&  APP_STORAGE.getRoleRead() === 1 && (
                                    <div>
                                    <IconButton
                                    onClick={() => {devGr.setOpen_menu(true)}}
                                    id="long-button-menu"
                                    aria-label="more"
                                    aria-controls={open ? "long-menu" : undefined}
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    >
                                    <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                    "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={document.getElementById("long-button-menu")}
                                    open={devGr.getOpen_menu()}
                                    onClose={() => {
                                    devGr.setOpen_menu(false);
                                    }}
                                    >

                                    <MenuItem onClick={() => this.editDevice('1')}>
                                    <ListItemIcon>
                                    <ModeEditRoundedIcon fontSize="small" />
                                    </ListItemIcon>{" "}
                                    Редактировать
                                    </MenuItem>

                                    <MenuItem onClick={() => this.editDevice('2')} >
                                    <ListItemIcon>
                                    <LogoutRoundedIcon fontSize="small" />
                                    </ListItemIcon>{" "}
                                    Переместить
                                    </MenuItem>
                                    </Menu>
                                    </div>
                                    )}
                                    </Box>

                                    <Box
                                    sx={{
                                    borderLeft: "1px solid #808080",
                                    p: "12px",
                                    borderRadius: "4px",
                                    background: "#eeeeee5e",
                                    }}
                                    >

                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    required
                                    fullWidth
                                    id="Название устройства"
                                    label="Название устройства"
                                    autoFocus
                                    disabled={true}
                                    value={gr_devs[key].name}
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
                                    disabled={true}
                                    value={gr_devs[key].longitude}
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
                                    disabled={true}
                                    value={gr_devs[key].latitude}
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
                                    disabled={true}
                                    value={gr_devs[key].info}
                                    />
                                    </Box>
                                    </Box>
                                    </React.Fragment>
                                    );
                                  }



/////////////////////////// Устройство действующее ( deleted - false)
            if (gr_devs[key].deleted === false) {  
                                      devs.push(
                                      <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                                      <Box className="wrappert-devs">
                                      <Box
                                      sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                      alignItems: "start",
                                      flexDirection: 'row-reverse'
                                      }}
                                      >
                                      <Box className="right_wrapper_dev" >
                                      <Typography sx={{ fontSize : '12px' ,  color: '#AAAAAA'}}>
                                      Место расположения устройства - {gr.g_name} 
                                      </Typography>

                                      {APP_STORAGE.getRoleWrite() === 2 &&
                                      APP_STORAGE.getRoleRead() === 1 && (
                                      <div>
                                      <IconButton
                                      onClick={() => {
                                        devGr.setOpen_menu(true);
                                      }}
                                      id="long-button555"
                                      aria-label="more"
                                      aria-controls={open ? "long-menu" : undefined}
                                      aria-expanded={open ? "true" : undefined}
                                      aria-haspopup="true"
                                      >
                                      <MoreVertIcon />
                                      </IconButton>
                                      <Menu
                                      id="long-menu"
                                      MenuListProps={{
                                      "aria-labelledby": "long-button",
                                      }}
                                      anchorEl={document.getElementById("long-button555")}
                                      open={devGr.getOpen_menu()}
                                      onClose={() => {
                                      devGr.setOpen_menu(false);
                                      }}
                                      >
                                      <MenuItem onClick={() => this.editDevice('1')}>
                                      <ListItemIcon>
                                      <ModeEditRoundedIcon fontSize="small" />
                                      </ListItemIcon>{" "}
                                      Редактировать
                                      </MenuItem>

                                      <MenuItem onClick={() => this.editDevice('2')} >
                                      <ListItemIcon>
                                      <LogoutRoundedIcon fontSize="small" />
                                      </ListItemIcon>{" "}
                                      Переместить
                                      </MenuItem>
                                      </Menu>
                                      </div>
                                      )}
                                        </Box>
                                        <Box>

                                      <Typography sx={{ color: "#000", fontWeight: "600" }}>
                                       Название устройства - {gr_devs[key].name}{" "}
                                      </Typography>  

                                    
                                      <Typography sx={{ color: "#000" }}>
                                       Долгота - {gr_devs[key].longitude}{" "}
                                      </Typography>
                                       

                                      <Typography sx={{ color: "#000"}}>
                                       Широта - {gr_devs[key].latitude}{" "}
                                      </Typography>
                                     

                                     
                                      
                                      <Link sx= {{fontSize:'14px'}} onClick={() => {window.location.href='/show-map?lng=' + gr_devs[key].longitude + '&lat=' + gr_devs[key].latitude}}>Показать на карте</Link>
                                      
                                    
                                      {/* <Typography sx={{ color: "#000" }}>
                                       Информация - {gr_devs[key].info}{" "}
                                      </Typography> */}
                                      </Box>

                                      </Box>

  {/*------------------------- Информация об устройстве ------------------------------------------------------------*/}
                                     

                                      </Box>                                   
                                      </React.Fragment>
                                      );
          }
        }
      }

          var childs: React.ReactNode[] = new Array();
          if (gr_childs.length > 0) childs = this.drawDevs(gr_childs);
          devs.push(childs);}
          return devs;
  }


  drawDevsFunction (): React.ReactNode {
    let Dev: any;
    Dev = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevs(Dev); /// передаем сформированные данные
  }


  render(): React.ReactNode {
    return (
      <React.Fragment>
         <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>
              {" "}
              Данные по устройству{" "}
         </Typography>
       {this.drawDevsFunction()}
      </React.Fragment>
    );
  }
}
