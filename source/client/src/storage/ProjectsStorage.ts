/*import { observable, action, computed, makeAutoObservable} from 'mobx';
import { WSocket } from './WSocket';

import { IWSQuery, WSQuery } from '../../../xcore/WSQuery';
import { ProjectEntity } from '../../../xcore/dbase/ProjectsTable';


export class ProjectsStorage{

    @observable projects: ProjectEntity[] = new Array();

    constructor(){
        makeAutoObservable(this);
    }

    async getProjects(){
        var sock = await WSocket.get();
        var q:IWSQuery = new WSQuery('get_all_projects');
        sock.send(q);
    }
}
*/