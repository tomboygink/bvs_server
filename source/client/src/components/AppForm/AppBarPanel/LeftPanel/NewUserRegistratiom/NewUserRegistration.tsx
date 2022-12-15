import * as React from "react";
import {
  Box,
  Link,
  TextField,
  Button,
  FormHelperText,
  TextareaAutosize,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import AddIcon from '@mui/icons-material/Add';

interface IProps {}

@observer
export class NewUserRegistration extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async AddNewUser() {
    APP_STORAGE.reg_user.set_NewUser("sess_id", APP_STORAGE.auth_form.getdt());
  }
  async SelectedOrg(a:any) {
   APP_STORAGE.reg_user.setKeyOrg(a)
   APP_STORAGE.reg_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
   APP_STORAGE.reg_user.get_UserRoles("sess_id", APP_STORAGE.auth_form.getdt()); // роли
  }

  async OpenModalRegUser(e: any, tittle: string) {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());

    APP_STORAGE.reg_user.setTakeModal(e);
    APP_STORAGE.reg_user.setTittleModal(tittle);
    APP_STORAGE.reg_user.setModalRegUser(true);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }
  
  render(): React.ReactNode {
  let org = JSON.parse(JSON.stringify (APP_STORAGE.reg_user.getOrgAll()))
  var options:React.ReactNode = <></>;

    return (
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            error={APP_STORAGE.reg_user.getErrorFamily()}
            helperText={APP_STORAGE.reg_user.getTextHelpFamily()}
            label="Фамилия"
            autoComplete="фамилия"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setFamily(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getFamily()}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            error={APP_STORAGE.reg_user.getErrorName()}
            helperText={APP_STORAGE.reg_user.getTextHelpName()}
            label="Имя"
            autoComplete="имя"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setName(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getName()}
          />

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            variant="outlined"
            margin="normal"
            required
            error={APP_STORAGE.reg_user.getErrorFather()}
            helperText={APP_STORAGE.reg_user.getTextHelpFather()}
            label="Отчество"
            autoComplete="отчество"
            autoFocus
            size="small"
            onChange={(e) => {
              APP_STORAGE.reg_user.setFather(e.target.value);
            }}
            value={APP_STORAGE.reg_user.getFather()}
          />
        </Box>

        <TextField
          sx={{ mt: "12px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          error={APP_STORAGE.reg_user.getErrorEmail()}
          helperText={APP_STORAGE.reg_user.getTextHelpEmail()}
          label="email"
          autoComplete="email"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setEmail(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getEmail()}
        />

        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          fullWidth
          required
          error={APP_STORAGE.reg_user.getErrorTelephone()}
          helperText={APP_STORAGE.reg_user.getTextHelpTelephone()}
          label="Телефон"
          autoComplete="телефон"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setTelephone(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getTelephone()}
        />
        <FormHelperText sx={{ ml: "12px" }}>
          номер телефона должен содержать 10 символов.
        </FormHelperText>

        <FormControl fullWidth size="small" sx={{mt: "14px"}} >
        <InputLabel sx={{fontSize: '12px'}}>Организация</InputLabel>
            <Select 
                sx={{fontSize: '12px'}}
                value={ APP_STORAGE.reg_user.getKeyOrg() || ''}
                label="организация"
                onChange={(e) => {this.SelectedOrg(e.target.value);}}
              >
                <MenuItem 
                key={org.idd || ''} 
                sx={{fontSize: '12px'}} 
                value = {org.idd || ''}>{org.full_name || ''}
            </MenuItem> 
            <Divider />

             <Box 
                sx ={{ display: 'flex', justifyContent: 'flex-end', background: '#F1F5FC', m: 1, borderRadius: '4px'}}>
                  <MenuItem onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}> 
                    <AddIcon sx = {{fontSize: '17px', mt: 1, color: '#266BF1'}}/> 
                    <Typography sx={{fontSize: '12px', mt: 1}}>Добавить организацию</Typography> 
                  </MenuItem>  
             </Box>  
            </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{mt: "14px"}} >
        <InputLabel sx={{fontSize: '12px'}}>Должность</InputLabel>
            <Select 
                sx={{fontSize: '12px'}}
                value={ APP_STORAGE.reg_user.getKeyOrg() || ''}
                label="должность"
              >
                <MenuItem 
                key={org.idd || ''} 
                sx={{fontSize: '12px'}} 
                value = {org.idd || ''}>{org.full_name || ''}
            </MenuItem> 
              <Divider />

              <Box 
                 sx ={{ display: 'flex', justifyContent: 'flex-end', background: '#F1F5FC', m: 1, borderRadius: '4px'}}>
              <MenuItem > 
              <AddIcon sx = {{fontSize: '17px', mt: 1, color: '#266BF1'}}/> 
              <Typography sx={{fontSize: '12px', mt: 1}}>Добавить должность</Typography> 
              </MenuItem>  
              </Box>  
            </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{mt: "14px", background: '#F1F5FC'}} >
        <InputLabel sx={{fontSize: '12px'}}>Группы доступа</InputLabel>
            <Select 
                sx={{fontSize: '12px'}}
                value={ APP_STORAGE.reg_user.getKeyOrg() || ''}
                label="группы доступа"
                
              >
            <MenuItem  
                sx={{fontSize: '12px'}} 
                value = "1">разрешить редактирование
            </MenuItem> 

              <MenuItem 
                sx={{fontSize: '12px'}} 
                value = "2"> только чтение
            </MenuItem>   
            </Select>
        </FormControl>


        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          required
          error={APP_STORAGE.reg_user.getErrorLogin()}
          helperText={APP_STORAGE.reg_user.getTextHelpLogin()}
          fullWidth
          label="Логин"
          autoComplete="логин"
          autoFocus
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setLogin(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getLogin()}
        />


        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          required
          error={APP_STORAGE.reg_user.getErrorPassword()}
          helperText={APP_STORAGE.reg_user.getTextHelpPassword()}
          fullWidth
          label="Пароль"
          autoComplete="пароль"
          autoFocus
          type="password"
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setPassword(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getPassword()}
        />


        <FormHelperText sx={{ ml: "12px" }}>
          используйте 6 или более символов, сочетая буквы, цифры и символы.
        </FormHelperText>
        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          required
          error={APP_STORAGE.reg_user.getErrorRepeatPassword()}
          helperText={APP_STORAGE.reg_user.getTextHelpRepeatPassword()}
          fullWidth
          label="Повторите пароль"
          autoComplete="повторите пароль"
          autoFocus
          type="password"
          size="small"
          onChange={(e) => {
            APP_STORAGE.reg_user.setRepeatPassword(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getRepeatPassword()}
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
            APP_STORAGE.reg_user.setInfo(e.target.value);
          }}
          value={APP_STORAGE.reg_user.getInfo() || ""}
        />


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
              this.AddNewUser();
            }}
          >
            Сохранить
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}
