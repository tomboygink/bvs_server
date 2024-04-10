export interface IWell {
  id: string;
  number: string;
  location: {
    id: string;
    name: string;
  };
  org: {
    id: string;
    name: string;
  };
  dev?: {
    id: string;
    number: string;
  };
}

export interface IDefaultWell {
  id: string;
  number: string;
  org_id: string;
  group_id: string;
  dev_id: string;
}
