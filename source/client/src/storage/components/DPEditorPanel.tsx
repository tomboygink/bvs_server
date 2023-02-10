
export type T_D_GROUP = { "id":number, "parent_id":number, "g_name":string, "g_info":string, latitude: string, longitude: string, ord_num: number, deleted:boolean, childs:T_D_GROUP[] };
export const D_GROUP = { "id":0, "parent_id":0, "g_name":'', "g_info":'', latitude: '0.0', longitude: '0.0', ord_num: 0, deleted:false, childs: new Array() };

interface IProps {
    d_group?: T_D_GROUP,
    edt_key?:number,
    onSave?: (e:any)=>void
}

interface IState {
    s_group:T_D_GROUP,
    p_group:T_D_GROUP,
    sh_dlg_key: number
}


