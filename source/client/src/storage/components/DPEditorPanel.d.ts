export type T_D_GROUP = {
    "id": number;
    "parent_id": number;
    "g_name": string;
    "g_info": string;
    latitude: string;
    longitude: string;
    ord_num: number;
    deleted: boolean;
    childs: T_D_GROUP[];
};
export declare const D_GROUP: {
    id: number;
    parent_id: number;
    g_name: string;
    g_info: string;
    latitude: string;
    longitude: string;
    ord_num: number;
    deleted: boolean;
    childs: any[];
};
