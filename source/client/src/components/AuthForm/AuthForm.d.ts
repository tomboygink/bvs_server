import React from "react";
interface IProps {
}
type State = {
    showPassword: boolean;
};
export declare class AuthForm extends React.Component<IProps, State> {
    constructor(props: any);
    handleClickShowPassword(): Promise<void>;
    render(): React.ReactNode;
}
export {};
