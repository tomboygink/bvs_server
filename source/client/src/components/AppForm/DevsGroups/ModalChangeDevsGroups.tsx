import React from "react";
import { observer } from "mobx-react";

import {TextField, Box, Dialog , Divider , Typography, TextareaAutosize, Button, FormControl,InputLabel, Select, MenuItem} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { APP_STORAGE } from "../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Paper from '@mui/material/Paper';

import SensorsIcon from "@mui/icons-material/Sensors";



interface IProps {}

//Компонент формы приложения
@observer
export class ModalChangeDevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
  
    return (
        <React.Fragment>

        <Dialog BackdropProps={{style:{background:'rgba(0, 0, 0, 0.75)'} } } open={APP_STORAGE.devs.getOpenModal()}
           PaperProps={{
            sx: {
              width: "100%",
              maxHeight: '100%'
            }
          }}
        >
         
        <Box  sx={{p: 2}}>
  
        <Box className='ModalTitle' sx = { {display: 'flex' , justifyContent: 'space-between', mb: '12px'}}> 
         
        <Typography >  
            Редактирование групп устройств
        </Typography>
  
        <CloseIcon  sx={{color: '#1976D2'}}
             onClick={ ()=>{APP_STORAGE.devs.setOpenModal(false)}}/>
        </Box>  
        
        <Divider sx = {{marginBottom: '20px'}}/>
         
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



  <Box sx = {{pb: '12px'}}>Список сенсоров на устройстве :</Box>

        <Button onClick={() => {APP_STORAGE.devs.setDepthSensors(true)}}>Добавить</Button>
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
