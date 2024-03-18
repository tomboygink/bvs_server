import { IDevice, IGroup } from "../src/models/IDevice";
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
