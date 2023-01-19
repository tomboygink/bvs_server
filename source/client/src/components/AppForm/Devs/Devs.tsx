import * as React from "react";
import { Box,Typography, TextField, TextareaAutosize, Divider} from "@mui/material";


import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";



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

  render(): React.ReactNode {
    let devs_g = [];
    let parent = [];
    let child = [];
    let tree = [];

    let name_group_dev = []
    


    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in devs_g) {
        if (devs_g.hasOwnProperty(key)) {
          let a = devs_g[key];
          let b = JSON.parse(a)
          console.log('group_devs', b);

          for (let i=0; i < b.childs.length; i++){

            name_group_dev.push(
              
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{fontWeight: '700'}}>{b.childs[i].group.g_name}</Typography>
                <Typography sx={{}}>Заводской номер - 6666</Typography>
              </Box>
  
  
              {/* {devs_form} */}
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
  
             )
         
       
            
          }
          

        }
      }
    }
     
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

         {name_group_dev}
          
        </Box>
      </React.Fragment>
    );
  }
}
