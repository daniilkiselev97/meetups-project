import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UserBackend } from '../../models/user.models';
import { initialState } from '../allMeetups/meetups.reducers';

export interface UsersState {
  users: UserBackend[];
}


export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
);
