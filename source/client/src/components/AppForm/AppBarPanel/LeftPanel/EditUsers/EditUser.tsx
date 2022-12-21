import React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

import { TextField, Box, Dialog, Divider, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


import {
    Link,
    Button,
    FormHelperText,
    TextareaAutosize,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    Alert,
  } from "@mui/material";
  import FormGroup from "@mui/material/FormGroup";
  import Stack from "@mui/material/Stack";

interface IProps {}

@observer
export class EditUser extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
   
    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.edit_user.getModalEditUser()}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <Typography>{APP_STORAGE.reg_user.getTittleModal()}</Typography> */}

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  APP_STORAGE.edit_user.setModalEditUser(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

        
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

        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Организация
          </InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyOrg() || ""}
            label="организация"
           
          >
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 1,
                borderRadius: "4px",
              }}
            >
              <MenuItem
               
              >
              
                <Typography sx={{ fontSize: "12px", mt: 1 }}>
                  Добавить организацию
                </Typography>
              </MenuItem>
            </Box>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel sx={{ fontSize: "12px" }}>Должность</InputLabel>
          <Select
            sx={{ fontSize: "12px" }}
            value={APP_STORAGE.reg_user.getKeyJobs() || ""}
            label="должность"
           
          >
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 1,
                borderRadius: "4px",
              }}
            >
              <MenuItem
                
              >
               
                <Typography sx={{ fontSize: "12px", mt: 1 }}>
                  Добавить организацию
                </Typography>
              </MenuItem>
            </Box>
          </Select>
        </FormControl>

        <TextField
          sx={{ mt: "14px" }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
          variant="outlined"
          required
          error={APP_STORAGE.reg_user.getErrorLogin() || APP_STORAGE.reg_user.getErrorLoginDouble() }
          helperText={APP_STORAGE.reg_user.getTextHelpLogin() || APP_STORAGE.reg_user.getTextHelpLoginDouble()}
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
        <form>
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
        </form>
        <Divider sx={{ padding: "12px" }} />

        <FormGroup sx={{ mt: "12px" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}>
              Разрешить редактирование -{" "}
            </Typography>
        
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1, mb: 1 }}
          >
            <Typography sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}>
              Только чтение -{" "}
            </Typography>
           
          </Stack>
        </FormGroup>

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
           
          >
            Сохранить
          </Button>
        </Box>
        {APP_STORAGE.reg_user.getResulSave().length > 0 &&
       <Typography sx= {{background: '#EDF7ED', color : '#1E4620', p: '12px', borderRadius: '4px'}}> {APP_STORAGE.reg_user.getResulSave()}</Typography>
      }
   
           




          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
