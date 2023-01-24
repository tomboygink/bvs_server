import React from "react";
import { observer } from "mobx-react";

import {TextField, Box, Dialog , Divider , Typography, TextareaAutosize, Button, FormControl,InputLabel, Select, MenuItem} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { APP_STORAGE } from "../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {}

//Компонент формы приложения
@observer
export class ModalDevs1 extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false)
}

async SelectedOrg(a: any) { 
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  render(): React.ReactNode {
   

    let org = null;
    var options_org = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(  
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }


    let group_devs = [];
    let devs = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );

    for (var key in devs) {
      if (devs.hasOwnProperty(key)) {
        let a = devs[key];

        if (a.id === APP_STORAGE.devs.getIdChild()) {
          group_devs.push(
            <Typography > Родитель - {a.g_name} </Typography>
          );
        }
      }
    }


    return (
        <React.Fragment>

        <Dialog BackdropProps={{style:{background:'rgba(0, 0, 0, 0.75)'} } } open={APP_STORAGE.devs.getOpenModal()}  fullWidth >
         
        <Box  sx={{p: 2}}>
  
        <Box className='ModalTitle' sx = { {display: 'flex' , justifyContent: 'space-between', mb: '12px'}}> 
         
        <Typography >  
            Добавить устройство
        </Typography>
  
        <CloseIcon  sx={{color: '#1976D2'}}
             onClick={ ()=>{APP_STORAGE.devs.setOpenModal(false)}}/>
        </Box>  
        
        <Divider sx = {{marginBottom: '20px'}}/>
        
        {group_devs}
         
        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Номер устройства"
          autoComplete="Номер устройства"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs.setNumber(e.target.value);
          }}
          value={APP_STORAGE.devs.getNumber()}
        />

        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="название устройства "
          autoComplete="Название устройства"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs.setName(e.target.value);
          }}
          value={APP_STORAGE.devs.getName()}
        />


         <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Долгота"
          autoComplete="долгота"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs.setLongitude(e.target.value);
          }}
          value={APP_STORAGE.devs.getLongitude()}
        />

          <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} 
          InputLabelProps={{ style: { fontSize: 12 } }} 
          variant="outlined"
          fullWidth
          required
          label="Широта"
          autoComplete="широта"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.devs.setLatitude(e.target.value);
          }}
          value={APP_STORAGE.devs.getLatitude()}
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
            onChange={(e) => {
                APP_STORAGE.devs.setInfo(e.target.value);
            }}
            value={APP_STORAGE.devs.getInfo()}
          />
<Box sx = {{border: '1px solid #eee' , p: '12px', borderRadius: '4px'}}>
  <Box sx = {{pb: '12px'}}>Список сенсоров на устройстве</Box>
    <TextField
          size="small"
          fullWidth
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            APP_STORAGE.devs.setSensors([e.target.value]);
        }}
        />
           <Button>Добавить</Button>
</Box>


          <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-end",
          }}
        >
        
          <Button
            sx={{
              background: "#266BF1",
              color: "#fff;",
              mt: "18px",
              mb: "18px",
              fontSize: "12px",
            }}
             onClick={() => {
              APP_STORAGE.devs.set_NewDevs("sess_id", APP_STORAGE.auth_form.getdt());
            }}
          >
            Сохранить
          </Button>
        </Box>
             
        </Box>
        </Dialog>
        </React.Fragment>
    );
  }
}
