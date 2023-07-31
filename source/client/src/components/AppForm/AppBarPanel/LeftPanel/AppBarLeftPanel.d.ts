import * as React from "react";
interface IProps {
}
export declare class AppBarLeftPanel extends React.Component<IProps> {
    constructor(props: any);
    OpenListDev(): Promise<void>;
    OpenListOrg(): Promise<void>;
    OpenListJobsTitles(): Promise<void>;
    DevLocation(e: any): Promise<void>;
    OpenModalRegUser(e: any, tittle: string): Promise<void>;
    OpenTableUser(a: any): Promise<void>;
    functionSetIdOrgUser(): Promise<void>;
    render(): React.ReactNode;
}
export {};
