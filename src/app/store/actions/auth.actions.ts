
import { createAction, props } from '@ngrx/store';
import { UserLogin, UserRegistrationData, AuthToken } from '../../models/auth.models';

export const login = createAction('[Auth] Login', props<{ user: UserLogin }>());

export const signup = createAction('[Auth] Register', props<{ userData: UserRegistrationData }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ authToken: AuthToken}>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: unknown }>());

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: unknown }>());
