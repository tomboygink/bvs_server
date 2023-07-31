import * as React from 'react';
interface IProps {
}
export declare class AccountMenu extends React.Component<IProps> {
    constructor(props: any);
    onLogOut(): Promise<void>;
    ChangeCUserData(): Promise<void>;
    ChangePassword(): Promise<void>;
    render(): React.ReactNode;
}
export {};
