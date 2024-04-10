import { is } from "@react-spring/shared";
import { IDevice, IGroup } from "../src/models/IDevice";
import { Org } from "../src/storage/components/Orgs/OrgStorage";
import { set, toJS } from "mobx";
export const getDigitalStr = (str: string) => {
  return str.replace(/[^\d\.,]/g, "").replace(/,/g, ".");
};

export const getSelectedGroup = (
  arr: IGroup[],
  id: string,
  setFunction: (state: IGroup) => void
) => {
  for (let elem of arr) {
    if (
      elem.devs.find((dev: IDevice) => {
        return dev.id === id;
      })
    ) {
      setFunction(elem);
    }

    if (elem.childs.length !== 0) {
      getSelectedGroup(elem.childs, id, setFunction);
    }
  }
};

export const getMatchedOrg = (arr: Org[], orgId: string): string => {
  const org = arr.find((org: Org) => org.id === orgId);
  return org.full_name;
};

// Options для списка с расположением
export const getGroups = (locations: IGroup[]) => {
  let allLocations: any[] = [];
  const recursion = (arr: IGroup[]) => {
    arr.forEach((item) => {
      if (item.childs.length > 0) {
        recursion(item.childs);
      }

      allLocations = [
        ...allLocations,
        {
          id: item.group.id,
          name: item.group.g_name,
          parent_id: item.group.parent_id,
          org_id: item.group.org_id,
        },
      ];
    });
    // const groups = arr.reduce((acc, { group: { g_name, id } }) => {
    //   return [...acc, { id, name: g_name }];
    // }, []);
    // setGroup(groups);
  };
  recursion(locations);
  return allLocations;
};

export const getDevsOptions = (
  arr: IDevice[],
  value: string,
  setFunction: (state: IDevice[]) => void
) => {
  const optionsData = arr.filter((item) => item.group_dev_id === value);
  setFunction(optionsData);
};

export const getOrgsOptions = (arr: any[], value: string) => {
  return arr.filter((item) => item.id === value);
};
