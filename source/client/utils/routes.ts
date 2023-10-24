import { AuthForm } from "../src/components/AuthForm/AuthForm";
import { ForgotPass } from "../src/components/AuthForm/ForgotPassForm";
import { LOGIN_ROUTE, FORGOT_PASS_ROUTE } from "./consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthForm
  },

  {
    path: FORGOT_PASS_ROUTE,
    Component: ForgotPass
  }
];
