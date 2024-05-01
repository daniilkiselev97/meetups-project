
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';

export const authNode = 'auth';

const initialState: AuthState = {
	user: null,
	token: null,
	isAuth: false,
};

export const authReducer = createReducer(
	initialState,

	on(
		AuthActions.loginSuccess,
		(state: AuthState, { userInfo: { user, token } }) => ({
			...state,
			token,
			user,
			isAuth: true
		})
	),

	on(
		AuthActions.loginFailed,
		(state: AuthState) => ({
			...initialState
		})
	),

	on(
		AuthActions.logoutSuccess,
		(state: AuthState) => ({
			...initialState
		})
	),
	on(
		AuthActions.signupSuccess,
		(state: AuthState, { userInfo: { user, token } }) => ({
			...state,
			token,
			user,
			isAuth: false
		})
	),
	on(
		AuthActions.signupFailed,
		(state: AuthState) => ({
			...initialState
		})
	),
);


