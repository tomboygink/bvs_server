import * as React from "react";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
interface IProps {
}
export declare class SensorsList extends React.Component<IProps> {
    constructor(props: any);
    closeModal(): Promise<void>;
    SelectedOrg(a: any): Promise<void>;
    OpenModal(): Promise<void>;
    setAnchorEl(a: string): void;
    SortDescSensors(a: string): Promise<void>;
    drawSensors(dgrs: TDevsGroup[]): React.ReactNode[];
    drawDevLocation(): React.ReactNode;
    render(): React.ReactNode;
}
export {};
