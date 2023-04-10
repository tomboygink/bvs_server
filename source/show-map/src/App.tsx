import React from 'react';

import { observer } from 'mobx-react';

import LeafletMap from './components/show-map'
import { Box } from '@mui/material';


interface IProps {}

@observer 
export class App extends React.Component<IProps>{
    
    constructor(props:any){
        super(props);
    }

    componentDidMount(): void {
    }

    componentWillUnmount(): void {}
    
 

    render(): React.ReactNode {

   
        return ( 
            <React.Fragment> 
                <Box sx ={{height: '100vh'}}>
                <LeafletMap/>
                </Box>
            </React.Fragment>
        );
    }
}