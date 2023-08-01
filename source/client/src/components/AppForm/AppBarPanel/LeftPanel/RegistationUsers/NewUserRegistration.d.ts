import * as React from "react";
interface IProps {
}
export declare class NewUserRegistration extends React.Component<IProps> {
    constructor(props: any);
    AddNewUser(): Promise<void>;
    ChekedForEdit(editing: any): Promise<void>;
    ChekedForRead(readind: any): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    SelectedJobs(a: any): Promise<void>;
    OpenModalRegUser(e: any, tittle: string): Promise<void>;
    render(): React.ReactNode;
}
export {};
