
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';
import { UserAuthBackend } from 'src/app/models/user.models';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export const authNode = 'auth';

const initialState: AuthState = {
	user: null,
	token: null,
	isAuth: false,
};


// const authService = inject(AuthService);

export const authReducer = createReducer(
	initialState,

	on(
		AuthActions.loginSuccess,
		(state: AuthState, { userInfo: { user, token } }) => ({
			...state,
			token: token,
			user: user,
			isAuth: true
		})
	),

	on(
		AuthActions.loginFailed,
		(state: AuthState) => ({
			...state,
			token: null,
			user: null,
			isAuth: false
		})
	),

	on(
		AuthActions.logoutSuccess,
		(state: AuthState) => ({
			...state,
			user: null,
			token: null,
			isAuth: false,
		})
	),
	on(
		AuthActions.signupSuccess,
		(state: AuthState, { userInfo: { user, token } }) => ({
			...state,
			token: token,
			user: user,
			isAuth: false
		})
	),
	on(
		AuthActions.signupFailed,
		(state: AuthState) => ({
			...state,
			token: null,
			user: null,
			isAuth: false
		})
	),
);


