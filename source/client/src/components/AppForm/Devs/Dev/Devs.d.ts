import * as React from "react";
import { TDevsGroup } from "../../../../storage/components/Devs/DevEntityes";
interface IProps {
}
export declare class Devs extends React.Component<IProps> {
    constructor(props: any);
    setDevNumber(a: any, id: any, dev: boolean, time_dev: string): Promise<void>;
    drawDevs(dgrs: TDevsGroup[]): React.ReactNode[];
    drawDevsFunction(): React.ReactNode;
    render(): React.ReactNode;
}
export {};
