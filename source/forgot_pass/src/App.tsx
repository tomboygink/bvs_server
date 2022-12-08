import React from 'react';

import { observer } from 'mobx-react';

import {ForgotPass} from './components/ForgotPassForm'


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
                <ForgotPass/>
            </React.Fragment>
        );
    }
}