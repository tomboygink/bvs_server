import * as React from "react";
import { Box,Typography, TextField, TextareaAutosize, Divider} from "@mui/material";


import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { TDevsGroup } from "../../../storage/components/DevEntityes";
import { TDGroup } from "../../../storage/components/DevEntityes";
import { TDevice } from "../../../storage/components/DevEntityes";


interface IProps {}

//Компонент формы приложения
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {//// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal(){
    APP_STORAGE.devs.setOpenModal(true);
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    var parent: React.ReactNode[] = new Array();
    var ch: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);
      
       
      
     
        parent.push(
          <React.Fragment key={"_gr_id_key_" + gr.id}>
            <Box sx={{ display: "flex" }}>
              <Box
                id={String(gr.id)} >
               
                {childs}
              </Box>
            </Box>
          </React.Fragment>
        );
  
        if (APP_STORAGE.devs.getIdDevs() === String(gr.id)){
          
          parent.push(
            <React.Fragment key={String(gr.id)}>
            <Box sx = {{width: '1100px;', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center', mb: '16px'}}>
  
            <Box sx= {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
            <Box>
            <Typography sx = {{fontWeight: '500', fontSize: '22px'}}>{gr.g_name}</Typography>
            <Typography sx={{fontSize: '12px', color: 'grey'}}>
                    Место расположения устройства
             </Typography>  
            </Box>
           
           
    
            </Box>    
         {gr_devs.map((row : any, i : any) => (
         <Box key={'_key_dev_' + gr.id}>{row.name}</Box> 
               
        ))}
        
             

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
            </React.Fragment>
          )
        }
       
    }
    return parent;
  }

  drawDevLocation(): React.ReactNode {
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
  
    return this.drawDevGroup(DevGr);
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
            Список устройствq
          </Typography>

         {/* {name_group_dev} */}
         {this.drawDevLocation()}
          
        </Box>
      </React.Fragment>
    );
  }
}
