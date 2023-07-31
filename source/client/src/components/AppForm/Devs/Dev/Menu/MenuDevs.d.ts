import * as React from "react";
import { TDevsGroup } from "../../../../../storage/components/Devs/DevEntityes";
interface IProps {
}
export declare class MenuDevs extends React.Component<IProps> {
    constructor(props: any);
    editDevice(a: any): Promise<React.ReactNode[]>;
    set_NewControlDevSess(): Promise<void>;
    deleteControlDevSess(): Promise<void>;
    PassValueEditForm(dgrs: TDevsGroup[]): React.ReactNode[];
    render(): React.ReactNode;
}
export {};
