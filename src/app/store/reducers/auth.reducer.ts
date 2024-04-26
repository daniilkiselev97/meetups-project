
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { initialState } from '../state/auth.state';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  })),

	
	// on(AuthActions.loginFailure, (state) => ({
  //   ...state,
  //   isAuthenticated: true,
  //   user: null,
  // })),
);
