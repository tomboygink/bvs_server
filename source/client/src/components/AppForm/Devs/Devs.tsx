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
import { TDevsGroup } from "../../../storage/components/DevEntityes";
import { TDGroup } from "../../../storage/components/DevEntityes";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';


interface IProps {}

//Устройства
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
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
                
                  if ( ("_dev_id_" + gr_devs[key].id === APP_STORAGE.devs.getIdChild())){
                    
                    devs.push(
                        <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>

                        <Typography fontSize='small' sx ={{color: '#645757'}}>Место расположения - {gr.g_name} </Typography> 

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
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список устройств
          </Typography>

          <Box
            sx={{
              boxShadow: "4px 6px 14px 2px rgb(0 0 0 / 4%);",
              width: "1100px",
              background: "#fff",
              p: "25px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: "16px",
            }}
          >
            
          {this.drawDevLocation()}

            <Box
                sx={{
                  background: "#F1F5FC",
                  width: "180px",
                  color: "#000",
                  p: "8px",
                  borderRadius: "4px",
                  mt: '12px'
                }}
                onClick={() => {
                  this.OpenModal();
                }}
              >
              <Typography> Добавить устройство</Typography>
              </Box>
        </Box>
        </Box>
      </React.Fragment>
    );
  }
}
