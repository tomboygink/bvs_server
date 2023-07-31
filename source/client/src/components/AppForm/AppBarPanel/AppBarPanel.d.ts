import * as React from 'react';
interface IProps {
}
export declare class AppBarPanel extends React.Component<IProps> {
    constructor(props: any);
    OpenLeftMenu(): Promise<void>;
    OpenModal(e: any, org_id: any): Promise<void>;
    render(): React.ReactNode;
}
export {};
