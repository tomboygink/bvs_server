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
    let group_dev = [];
    let name_group_dev = []; /// контейнер для списка устройств

    let devs = [];
    let sensors:Array<string> = [];
    let devs_form = [];

     if (APP_STORAGE.devs.getDevs()) {

      devs = JSON.parse(JSON.stringify(APP_STORAGE.devs.getDevs()));
   
      
      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];

          
         
        

        //   for (var key in JSON.parse(JSON.stringify(sensors))) {
        //     if (JSON.parse(JSON.stringify(sensors)).hasOwnProperty(key)) {
        //       let s = JSON.parse(JSON.stringify(sensors))[key];
        //      console.log('s', s.s[0]);
        //          ///sensors.push(a.sensors)
        //  }
        // }
              
          if (a.id === APP_STORAGE.devs.getIdDev()) {
            devs_form.push(
             <>
          <Box
              sx={{
                display: "flex",
                borderRadius: "4px",
                flexDirection: 'column',
                borderLeft: '1px solid #087ef3',
                p: "18px",
              }}
            >
          <Typography >Номер устройства - {a.number}</Typography>

          <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="Номер устройства"
                        label="номер устройства"
                        autoFocus  
                        ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={a.number}
                    />

                    
          <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="Название устройства"
                        label="Название устройства"
                        autoFocus  
                        ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={a.name}
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
              </>  
             );
          }
          else if (APP_STORAGE.devs.getIdDev() === '') {
            devs_form.push(
              <>
              <Typography>Необходимо выбрать устройство</Typography>
              </>)
            
          }
        }
      }

     }

   
  


    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      group_dev = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in group_dev) {
        if (group_dev.hasOwnProperty(key)) {
          let a = group_dev[key];
          if (a.id === APP_STORAGE.devs.getIdDevs() || a.id === APP_STORAGE.devs.getIdChild()) {

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
              <Typography sx={{fontWeight: '700'}}>{a.g_name}</Typography>
              <Typography sx={{}}>Заводской номер - 6666</Typography>
            </Box>


            {devs_form}
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
