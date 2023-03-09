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

import DirectionsIcon from '@mui/icons-material/Directions';
import { MenuDevs } from "./MenuDevs";
interface IProps {
}



@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);}


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
                                   <MenuDevs/>
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

                                      <MenuDevs/>

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
                                     

                                     
                                      
                                      <Link sx= {{fontSize:'1rem', fontWeight: '700'}} onClick={() => {window.open('http://127.0.0.1:3040/show-map?lng=' + gr_devs[key].longitude + '&lat=' + gr_devs[key].latitude)}}>Показать на карте
                                      
                                      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                      <DirectionsIcon />
                                      </IconButton>
                                      </Link>
                                      </Box>

                                      </Box>

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
      <>
         <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>
              {" "}
              Данные по устройству{" "}
         </Typography>
       {this.drawDevsFunction()}
       </>
    );
  }
}
