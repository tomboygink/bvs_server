import React from 'react';
import { observer } from 'mobx-react';

import { TextField, Box, Button, Divider, Typography, Checkbox, Alert, } from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SaveIcon from '@mui/icons-material/Save';




import { Route } from 'react-router-dom';


interface IProps { }


@observer
export class ChangeUserData extends React.Component<IProps> {
      constructor(props: any) {
            super(props);

      }

      async saveСhanges() {
            APP_STORAGE.modal.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt()); 
      }
        

      componentDidMount(): void {
            let user = APP_STORAGE.auth_form.getUser();
            if (APP_STORAGE.modal.getFamily() === '') {

                  APP_STORAGE.modal.setFamily(user.family)
            }

            if (APP_STORAGE.modal.getName() === '') {
                  APP_STORAGE.modal.setName(user.name)
            }

            if (APP_STORAGE.modal.getFather() === '') {
                  APP_STORAGE.modal.setFather(user.father)
            }

            if (APP_STORAGE.modal.getTelephone() === '') {
                  APP_STORAGE.modal.setTelephone(user.telephone)
            }


            if (APP_STORAGE.modal.getEmail() === '') {
                  APP_STORAGE.modal.setEmail(user.email)
            }


            if (APP_STORAGE.modal.getLogin() === '') {
                  APP_STORAGE.modal.setLogin(user.login)
            }
           
         
      }


      render(): React.ReactNode {
          APP_STORAGE.modal.setActMail(APP_STORAGE.auth_form.getUser().act_mail)
        
          var alert:React.ReactNode = <></>
         
          if(APP_STORAGE.modal.getActMail() === false){ 
            APP_STORAGE.modal.setSpawnAlert(true);
          }
          var alert_save_change:React.ReactNode = <></>;
          if(APP_STORAGE.modal.getActMail() === false && APP_STORAGE.modal.getEmail() !== '' && APP_STORAGE.modal.getSpawnAlert() === true){
              alert = <Alert sx = {{mt: '12px'}} severity="warning">На указанный email отправлен код подтверждения.</Alert>;
          }
         
        
            return (
                  <React.Fragment>
                        <Box>

                              <Box className='wrapper' sx= {{display: 'grid' , gridTemplateColumns: '1fr 8fr', gap: '8px' , alignItems: 'center'}}>
                              <Typography variant="caption" sx={{ color: '#0D80D8' }}>Фамилия: </Typography>
                              <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.modal.setFamily(e.target.value);; }}
                                    value={APP_STORAGE.modal.getFamily() || ''} />



                              <Typography variant="caption" sx={{ color: '#0D80D8' }}>Имя:</Typography>
                              <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.modal.setName(e.target.value); }}
                                    value={APP_STORAGE.modal.getName() || ''} />


                              <Typography variant="caption" sx={{ color: '#0D80D8' }}>Отчество:</Typography>
                              <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.modal.setFather(e.target.value); }}
                                    value={APP_STORAGE.modal.getFather() || ''} />


                              <Typography variant="caption" sx={{ color: '#0D80D8' }}>Телефон:</Typography>
                              <TextField
                                    error={APP_STORAGE.modal.getError_phone()}
                                    helperText={APP_STORAGE.modal.getPhone_message()}
                                    fullWidth
                                    size='small'
                                    type="tel"
                                    required
                                    onChange={(e) => { APP_STORAGE.modal.setTelephone(e.target.value); }}
                                    value={APP_STORAGE.modal.getTelephone()} />


                              <Typography variant="caption" sx={{ color: '#0D80D8' }}>E-mail:</Typography>
                              <Box sx={{ display: 'flex' }}>
                                    <TextField
                                          error={APP_STORAGE.modal.getError_emain()}
                                          helperText={APP_STORAGE.modal.getEmail_message() || APP_STORAGE.modal.getCmdErrData()}
                                          fullWidth
                                          color="success"
                                          focused = {APP_STORAGE.modal.get_emain()}
                                          size='small'
                                          type='email'
                                          required
                                          onChange={(e) => { APP_STORAGE.modal.setEmail(e.target.value); }}
                                          value={APP_STORAGE.modal.getEmail() || ''} />

                             
                              
                              <Checkbox
                                          checked={APP_STORAGE.auth_form.getUser().act_mail}
                                          id="myCheck"
                                          color="success"
                                          //onChange = { () => {this.confirmEmail}}
                                          inputProps={{ 'aria-label': 'controlled' }}
                                    />
                              </Box>  
                              </Box>
                              {alert}
                              <Divider sx ={{padding : '12px'}}/>
                              <Typography variant="caption">ПРИМЕЧАНИЕ:</Typography>
                              {/* <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.modal.setInfo(e.target.value); }}
                                    value={APP_STORAGE.modal.getInfo() || ''}
                                     /> */}

                              <TextareaAutosize
                                          aria-label="minimum height"
                                          minRows={12}
                                          style={{ width: '100%' }}
                                          onChange={(e) => { APP_STORAGE.modal.setInfo(e.target.value); }}
                                          value={APP_STORAGE.modal.getInfo() || ''}
                              />

                        </Box>
                        <Divider sx = {{mb: '12px' , mt : '12px'}} />
                   
                              <Button sx={{ mr: 2, mb: '16px', pt: 1 }}
                                    endIcon={<SaveIcon />}
                                    variant="outlined"
                                    onClick={() => { this.saveСhanges(); }}>
                                    Сохранить
                              </Button>
                 
                        {alert_save_change}
                  </React.Fragment>
            );
      }
}



