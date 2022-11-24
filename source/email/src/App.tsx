import React from 'react';

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
        APP_STORAGE.main.setTitle("ПОДТВЕРЖДЕНИЕ ПОЧТЫ");
    }


    componentWillUnmount(): void {}
    
    async set_sendCode() {
        APP_STORAGE.set_sendCode()
  }

    render(): React.ReactNode {
        document.title = APP_STORAGE.main.getTitle();

       
   
        return ( 
            <React.Fragment> 
                <Box sx = {{display: 'grid' , justifyContent: 'center'  , mt: '10%'}}> 
            <Typography sx ={{p: '20px'}}> Введите код</Typography>
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
            </React.Fragment>
        );
    }
}