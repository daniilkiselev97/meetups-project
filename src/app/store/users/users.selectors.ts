import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.model';
import { usersNode } from './users.reducers';

export const selectUsersState = createFeatureSelector<UsersState>(usersNode);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);
