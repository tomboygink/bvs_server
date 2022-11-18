import React from 'react';
import { observer } from 'mobx-react';

import {AppBarPanel} from './AppBarPanel/AppBarPanel'
import {PersonalAccaunt} from './MenuUser/PeronalAccaunt'

import { APP_STORAGE } from '../../storage/AppStorage';

interface IProps{}

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
     const user =  APP_STORAGE.auth_form.user;

     
        return (
            <React.Fragment>
                <AppBarPanel/>
                <PersonalAccaunt/>
            </React.Fragment>
        );
    }
}



