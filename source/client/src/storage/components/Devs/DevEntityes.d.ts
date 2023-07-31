export type TDSensor = {
    depth: number;
    value: number;
};
/**
 * Устройство
 */
export declare class TDevice {
    id: number;
    group_dev_id: number;
    number: string;
    name: string;
    latitude: string;
    longitude: string;
    sensors: TDSensorsList;
    info: string;
    time: string;
    deleted: boolean;
}
export type TDSensorsList = {
    "s": TDSensor[];
};
export declare const SENSORS_LIST: TDSensorsList;
/**
 * Устройство по умолчанию
 */
export declare const DEVICE: TDevice;
/**
 * Группа устройств
 */
export type TDGroup = {
    id: number;
    parent_id: number;
    g_name: string;
    latitude: string;
    longitude: string;
    ord_num: string;
    org_id: string;
    g_info: string;
    deleted: boolean;
};
export declare const D_GROUP: TDGroup;
/**
 * Полное описание рруппы устройств с вложением
 */
export declare class TDevsGroup {
    group: TDGroup;
    id: number;
    p_id: number;
    childs: TDevsGroup[];
    devs: TDevice[];
    updated: boolean;
}
/**
 * Дерево из групп с устройствами
 */
export declare const DEV_GR_NODE: TDevsGroup;
