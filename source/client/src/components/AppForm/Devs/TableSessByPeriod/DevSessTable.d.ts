import * as React from "react";
interface IProps {
}
export declare class DevSessTable extends React.Component<IProps> {
    constructor(props: any);
    set_NewControlDevSess(id: any, dev_id: any, dev_number: any): Promise<void>;
    setRowId(e: string, time: string, level_akb: string): Promise<void>;
    render(): React.ReactNode;
}
export {};
