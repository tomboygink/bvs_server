import * as React from 'react';

import {Drawer, List , Divider} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { APP_STORAGE } from '../../../storage/AppStorage'
import { observer } from 'mobx-react';


interface IProps{} 


@observer
export class AppBarLeftPanel extends React.Component<IProps> {
  
    constructor(props:any){
        super(props);     
    }
 
    render(): React.ReactNode {
        return (
            <React.Fragment>
          <Drawer
                sx={{
                width: 210,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: 210,
                },
                }}
                anchor="left"
                open={APP_STORAGE.app_bar.getSetOpenAppBar()}
                >
          <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>{ APP_STORAGE.app_bar.setSetOpenAppBar(false); }}
                edge="start" 
                >
                <ChevronLeftIcon  sx={{ marginLeft: 20}}/>
          </IconButton>
            <Divider />
            <List>
            Текст
            </List>
            <Divider />
            <List>
            Текст
            </List>
            </Drawer>
            </React.Fragment>
        );
    }
}



