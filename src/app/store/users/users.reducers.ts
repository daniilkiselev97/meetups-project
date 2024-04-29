import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UserBackend } from '../../models/user.models';
import { UsersState } from './users.model';

export const usersNode = 'users';


export const initialState: UsersState = {
	users: [],
};


export const usersReducer = createReducer(
	initialState,
	on(UsersActions.loadUsersSuccess, (state: UsersState, { users }) => ({
		...state,
		users,
	})),

	on(UsersActions.userUpdated, (state, { updatedUser, updatedUserRole }) => {
		const updatedUsers = state.users.map(user => {
			if (user.id === updatedUser.id) {
				return { 
					...user,
					...updatedUser,
					// roles: updatedUserRole
					};
			}
			return user;
		});
		return {
			...state,
			users: updatedUsers,

		};
	}),






);
