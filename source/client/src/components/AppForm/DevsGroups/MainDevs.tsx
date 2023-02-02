import * as React from 'react';

import { APP_STORAGE } from '../../../storage/AppStorage'
import { observer } from 'mobx-react';
import Box from '@mui/material/Box/Box';



interface IProps{} 


@observer
export class MainDevs extends React.Component<IProps> {
    constructor(props:any){
        super(props);   
    }

    async OpenLeftMenu() {
        APP_STORAGE.app_bar.setSetOpenAppBar(true);
      }

    render(): React.ReactNode {
        return (
      <React.Fragment>
        <Box className='container'>

          <Box className='card'>middle div</Box>

        </Box>
      </React.Fragment>
        );
    }
}



