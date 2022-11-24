import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { observer } from 'mobx-react';
import { APP_STORAGE } from './storage/AppStorage';

import { TextField, Box, Button, Divider, Typography, Checkbox, Alert, } from '@mui/material';




interface IProps {}

@observer 
export class App extends React.Component<IProps>{
    
    constructor(props:any){
        super(props);
    }

    componentDidMount(): void {
    }

    componentWillUnmount(): void {}
    
    async set_sendCode() {
        APP_STORAGE.set_SendCode()
        //APP_STORAGE.modal.set_SendCode('sess_id', APP_STORAGE.auth_form.getdt())
        //var ss_code = getCookie('sess_id');
  }

    render(): React.ReactNode {

       
   
        return ( 
            <React.Fragment> 
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc47', height: '100vh' }} >
            <Typography sx ={{p: '20px' , color: '#1976D2'}}> Введите код</Typography>
            <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.setCode(e.target.value); }}
                                    value={APP_STORAGE.getCode() || ''} />

                    <Button sx={{ m: '20px' }}
                                    variant="outlined"
                                    //   onClick={ ()=>{ APP_STORAGE.personal_acc.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt())}}> 
                                    onClick={() => { this.set_sendCode(); }}>
                                    Отправить
                              </Button>

                   </Box>
                   </Container>
            </React.Fragment>
        );
    }
}