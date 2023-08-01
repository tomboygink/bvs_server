import React from "react";
interface IProps {
}
export declare class AddNewDevModal extends React.Component<IProps> {
    constructor(props: any);
    closeModal(): Promise<void>;
    AddDevs(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    render(): React.ReactNode;
}
export {};
