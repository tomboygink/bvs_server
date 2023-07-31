import * as React from 'react';
interface IProps {
}
export declare class TableUser extends React.Component<IProps> {
    constructor(props: any);
    OpenSearch(): Promise<void>;
    SeachFamily(a: any): Promise<void>;
    SeachName(a: any): Promise<void>;
    SeachFather(a: any): Promise<void>;
    SeachLogin(a: any): Promise<void>;
    SeachTelephone(a: any): Promise<void>;
    SeachEmail(a: any): Promise<void>;
    render(): React.ReactNode;
}
export {};
