import * as React from "react";
interface IProps {
}
export declare class NewJobsTittle extends React.Component<IProps> {
    constructor(props: any);
    AddNewJobTitle(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    OpenModalRegUser(e: any, tittle: string): Promise<void>;
    render(): React.ReactNode;
}
export {};
