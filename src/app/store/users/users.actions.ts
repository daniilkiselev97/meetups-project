import { createAction, props } from '@ngrx/store';
import { MeetupBackendUser, UserBackend, UserBackendUpdate, UserCreateObj, UserUpdateObj } from '../../../shared/models/user.models';
import { AssigningRolesToBackend } from 'src/shared/models/roles.models';

export enum UsersActionTypes {
	LoadUsers = '[Users] Get Users',
	LoadUsersSuccess = '[Users] Get Users Success',
	LoadUsersFailure = '[Users] Get Users Failure',
	UpdateUser = '[Users] Update User',
	UserUpdated = '[Users] User Updated',
	UserFailedInUpdate = '[Users] User Failed And Not Updated',
	DeleteUser = '[Users] Delete User',
	UserDeleted = '[Users] User Deleted',
	UserFailedInDeletion = '[Users] User Failed And Not Deleted',
	CreateUser = '[Users] Create User',
	UserCreated = '[Users] User Created',
	UserFailedInCreation = '[Users] User Failed And Not Created',
}

export const loadUsers = createAction(UsersActionTypes.LoadUsers);
export const loadUsersSuccess = createAction(UsersActionTypes.LoadUsersSuccess, props<{ users: UserBackend[] }>());
export const loadUsersFailure = createAction(UsersActionTypes.LoadUsersFailure, props<{ errorMessage: string }>());

export const updateUser = createAction(UsersActionTypes.UpdateUser, props<{ userUpdateObj: UserUpdateObj }>());
export const userUpdated = createAction(UsersActionTypes.UserUpdated, props<{
	updatedUser: UserBackendUpdate;
	updatedUserRole: AssigningRolesToBackend;
}>());
export const userFailedInUpdate = createAction(UsersActionTypes.UserFailedInUpdate, props<{ errorMessage: string }>());

export const deleteUser = createAction(UsersActionTypes.DeleteUser, props<{ id: number }>());
export const userDeleted = createAction(UsersActionTypes.UserDeleted, props<{ userMeetup: MeetupBackendUser }>());
export const userFailedinDeletion = createAction(UsersActionTypes.UserFailedInDeletion, props<{ errorMessage: string }>());

export const createUser = createAction(UsersActionTypes.CreateUser, props<{ userCreateObj: UserCreateObj }>());
export const userCreated = createAction(UsersActionTypes.UserCreated, props<{ userCreateObj: any }>());
export const userFailedInCreation = createAction(UsersActionTypes.UserFailedInCreation, props<{ errorMessage: string }>());





