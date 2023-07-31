import React from "react";
interface IProps {
}
export declare class ChangeDevsModal extends React.Component<IProps> {
    constructor(props: any);
    closeModal(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    ChekedForEdit(editing: any): Promise<void>;
    ChangeSensors(a: any): Promise<void>;
    DeleteSensors(a: any): Promise<void>;
    AddSensors(a: any): Promise<void>;
    ChangeDevs(): Promise<void>;
    render(): React.ReactNode;
}
export {};
