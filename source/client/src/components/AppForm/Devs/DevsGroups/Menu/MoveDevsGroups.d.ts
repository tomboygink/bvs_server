import React from "react";
import { TDevsGroup } from "../../../../../storage/components/Devs/DevEntityes";
interface IProps {
}
export declare class MoveDevsGroups extends React.Component<IProps> {
    constructor(props: any);
    componentDidMount(): void;
    closeModal(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    SelectedDevsGroups(a: any): Promise<void>;
    drawDevLocation(): React.ReactNode;
    drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[];
    ChekedForEdit(editing: any): Promise<void>;
    SaveChangeDevsGroups(a: any): Promise<void>;
    render(): React.ReactNode;
}
export {};
