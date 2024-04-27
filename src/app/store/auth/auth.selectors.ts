import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';
import { authNode } from './auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authNode);

export const selectIsAuth = createSelector(
	selectAuthState,
	(state: AuthState) => state.isAuth
);

export const selectUser = createSelector(
	selectAuthState,
	(state: AuthState) => state.user
);

export const selectToken = createSelector(
	selectAuthState,
	(state: AuthState) => state.token
);
