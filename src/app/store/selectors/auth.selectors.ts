import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { UserLogin } from 'src/app/models/auth.models';
import {User} from 'src/app/models/user.models'

export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector('auth');

export const selectIsAuthenticated: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUser: MemoizedSelector<object, User | UserLogin | null> = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
