import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';




import { observer } from 'mobx-react';
import { APP_STORAGE } from './storage/AppStorage';
import  CircularIntegration  from './components/reload'

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
        <Box className='box_wrapper' sx={{p: '12px', mt: '10%', borderRadius: '4px', display: 'grid', boxShadow: '1px 3px 20px -1px rgb(3 131 229 / 20%);'}} >
            <Typography sx ={{p: '20px' , color: '#1976D2', justifySelf: 'center'}}> Введите код подтверждения</Typography>
            <TextField  sx = {{justifySelf: 'center'}}
                                    error = {APP_STORAGE.getError()}
                                    helperText={APP_STORAGE.getErorMass()}
                                    fullWidth
                                    size='small'
                                    onChange={(e) => { APP_STORAGE.setCode(e.target.value); }}
                                    value={APP_STORAGE.getCode() || ''} />

                    {/* <Button sx={{ m: '20px' }}
                                    variant="outlined"
                                    //   onClick={ ()=>{ APP_STORAGE.personal_acc.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt())}}> 
                                    onClick={() => { this.set_sendCode(); }}>
                                    Отправить
                              </Button> */}
                              <CircularIntegration/>

                   </Box>
                   </Container>
            </React.Fragment>
        );
    }
}