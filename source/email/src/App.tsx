import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';




import { observer } from 'mobx-react';
import { APP_STORAGE } from './storage/AppStorage';
import  CircularIntegration  from './components/reload'

import { TextField, Box, Typography, Alert, } from '@mui/material';


//  import {ConfirmMail} from '../../client/src/components/AppForm/ConfirmMail/ConfirmMail'


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
  }

    render(): React.ReactNode {
    let splArr = window.location.search.replace(/%20/g, "");
    let splArr1 = splArr.split('=')
    APP_STORAGE.setCode((splArr1[1]))
   
        return ( 
            <React.Fragment> 
      <CssBaseline />
      <Container maxWidth="sm">
        <Box className='box_wrapper' sx={{p: '12px', mt: '10%', borderRadius: '4px', display: 'grid', boxShadow: '1px 3px 20px -1px rgb(3 131 229 / 20%);'}} >
            <Typography sx ={{p: '20px' , color: '#1976D2', justifySelf: 'center'}}> Подтвердите код</Typography>
            <TextField sx = {{justifySelf: 'center'}}
                                    error = {APP_STORAGE.getError()}
                                    helperText={APP_STORAGE.getErorMass()}
                                    fullWidth
                                    size='small'
                                    disabled
                                    id="outlined-disabled"
                                    label="код подтверждения"
                                    onChange={(e) => { APP_STORAGE.setCode(e.target.value); }}
                                    value={APP_STORAGE.getCode() || ''} />

                              <CircularIntegration/>
                   </Box>
                   </Container>
             
            </React.Fragment>
        );
    }
}