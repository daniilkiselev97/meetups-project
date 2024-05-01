import { createAction, props } from '@ngrx/store';
import { UserLogin, UserRegistrationData, UserInfo } from '../../models/auth.models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailed = '[Auth] Login Failed',
  Signup = '[Auth] Register',
  SignupSuccess = '[Auth] Signup Success',
  SignupFailed = '[Auth] Signup Failed',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFailed = '[Auth] Logout Failed',
}

export const login = createAction(AuthActionTypes.Login, props<{ userLogin: UserLogin }>());
export const loginSuccess = createAction(AuthActionTypes.LoginSuccess, props<{ userInfo: UserInfo }>());
export const loginFailed = createAction(AuthActionTypes.LoginFailed, props<{ errorMessage: string }>());
export const signup = createAction(AuthActionTypes.Signup, props<{ userSignup: UserRegistrationData }>());
export const signupSuccess = createAction(AuthActionTypes.SignupSuccess, props<{ userInfo: UserInfo }>());
export const signupFailed = createAction(AuthActionTypes.SignupFailed, props<{ errorMessage: string }>());
export const logout = createAction(AuthActionTypes.Logout);
export const logoutSuccess = createAction(AuthActionTypes.LogoutSuccess);
export const logoutFailed = createAction(AuthActionTypes.LogoutFailed, props<{ errorMessage: string }>());

