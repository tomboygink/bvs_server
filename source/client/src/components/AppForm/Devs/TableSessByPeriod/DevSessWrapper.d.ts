import * as React from "react";
interface IProps {
}
export declare class DevSessWrapper extends React.Component<IProps> {
    constructor(props: any);
    handleExportExel(): Promise<void>;
    handleExportCSV(): Promise<void>;
    download_file_csv(content: any): Promise<void>;
    set_NewControlDevSess(id: any, dev_id: any, dev_number: any): Promise<void>;
    setDevSess(): Promise<void>;
    render(): React.ReactNode;
}
export {};
