import React from "react";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDevice } from "../../../storage/components/Devs/DevEntityes";
interface IProps {
    devs_tree: TDevsGroup;
    onSelect: (dev: TDevice) => void;
}
export declare class DevsGroupsTree extends React.Component<IProps> {
    constructor(props: any);
    static defaultProps: IProps;
    componentDidMount(): void;
    drawDeviceItem(dev: TDevice): React.ReactNode;
    drawDevGroup(dgrs: any): React.ReactNode[];
    drawDevsTree(): React.ReactNode;
    render(): React.ReactNode;
}
export {};
