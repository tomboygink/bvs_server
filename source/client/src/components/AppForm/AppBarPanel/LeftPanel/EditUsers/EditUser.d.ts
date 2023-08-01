import React from "react";
interface IProps {
}
export declare class EditUser extends React.Component<IProps> {
    constructor(props: any);
    SelectedOrg(a: any): Promise<void>;
    ActivityState(a: any): Promise<void>;
    ChangeUser(): Promise<void>;
    SelectedJobs(a: any): Promise<void>;
    ChekedForEdit(editing: any): Promise<void>;
    ChekedForRead(readind: any): Promise<void>;
    render(): React.ReactNode;
}
export {};
