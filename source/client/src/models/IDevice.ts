import {
  TDSensor,
  TDSensorsList,
} from "../storage/components/Devs/DevEntityes";

export interface IDevice {
  deleted: boolean;
  group_dev_id: string;
  id: string;
  info: string;
  latitude: string;
  longitude: string;
  name: string;
  number: string;
  period_sess: string;
  sensors: TDSensorsList;
  time: string;
  well: string;
}

export interface IGroupData {
  deleted: boolean;
  g_info: string;
  g_name: string;
  id: string;
  latitude: string;
  longitude: string;
  ord_num: number; // ToDo: проверить тип
  org_id: string;
  parent_id: string;
  svg: string;
}

export interface IGroup {
  childs: IGroup[];
  devs: IDevice[];
  group: IGroupData;
  id: string;
  p_id: string;
  sheme_svg: "" | null;
  update: boolean;
}

export interface ILocation {
  id: string;
  name: string;
  parent_id: string;
  org_id: string;
}
