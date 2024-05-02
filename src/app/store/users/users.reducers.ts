import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UserBackend } from '../../../shared/models/user.models';
import { UsersState } from './users.model';
import { state } from '@angular/animations';

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

	on(UsersActions.userUpdated, (state: UsersState, { updatedUser, updatedUserRole }) => {
		const newRoles = updatedUserRole.names.map((newRole) => ({
			name: newRole,
			id: updatedUserRole.userId
		}))
		const updatedUsers = state.users.map(user => {
			if (user.id === updatedUser.id) {
				return {
					...user,
					...updatedUser,
					roles: [...newRoles]
				};
			}
			return user;
		});
		return {
			...state,
			users: updatedUsers,

		};
	}),

	on(UsersActions.userDeleted, (state: UsersState, { userMeetup }) => ({
		...state,
		users: state.users.filter((user) => user.id !== userMeetup.id)
	})),

	on(UsersActions.userCreated, (state, { userCreateObj }) => {
		const newUser: UserBackend = {
			id: userCreateObj.id,
			email: userCreateObj.userUpdateObj?.email || userCreateObj.email,
			fio: userCreateObj.userUpdateObj?.fio || userCreateObj.fio,
			roles: userCreateObj?.names.map((name: string) => ({ name: name, id: userCreateObj.id })) || [{ name: 'USER' }],
			password: ''
		};
		return {
			...state,
			users: [...state.users, newUser]
		};
	})
);

