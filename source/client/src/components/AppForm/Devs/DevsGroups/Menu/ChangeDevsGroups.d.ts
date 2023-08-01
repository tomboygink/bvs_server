import React from "react";
interface IProps {
}
export declare class ChangeDevsGroups extends React.Component<IProps> {
    constructor(props: any);
    componentDidMount(): void;
    closeModal(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    ChangeDevsGroups(): Promise<void>;
    ChekedForEdit(editing: any): Promise<void>;
    SaveChangeDevsGroups(): Promise<void>;
    render(): React.ReactNode;
}
export {};
