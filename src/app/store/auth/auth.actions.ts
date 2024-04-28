import { createAction, props } from '@ngrx/store';
import { UserLogin, UserRegistrationData, UserInfo } from '../../models/auth.models';


export const login = createAction('[Auth] Login', props<{ userLogin: UserLogin }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ userInfo: UserInfo }>());
export const loginFailed = createAction('[Auth] Login Failed', props<{ errorMessage: string }>());
export const signup = createAction('[Auth] Register', props<{ userSignup: UserRegistrationData }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ userInfo: UserInfo }>());
export const signupFailed = createAction('[Auth] Signup Failed', props<{ errorMessage: string }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
