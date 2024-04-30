import { createAction, props } from '@ngrx/store';
import { MeetupBackendUser, UserBackend, UserBackendUpdate, UserCreateObj, UserUpdateObj } from '../../models/user.models';
import { AssigningRolesToBackend } from 'src/app/models/roles.models';
import { Observable } from 'rxjs';

export const loadUsers = createAction('[Users] Get Users');

export const loadUsersSuccess = createAction('[Users] Get Users Success', props<{ users: UserBackend[] }>());

export const loadUsersFailure = createAction('[Users] Get Users Failure', props<{ errorMessage: string }>());


export const updateUser = createAction('[Users] Update User', props<{ userUpdateObj: UserUpdateObj }>());


export const userUpdated = createAction('[Users] User Updated ', props<{
	updatedUser: UserBackendUpdate;
	updatedUserRole: AssigningRolesToBackend;
}>());

export const userFailedInUpdate = createAction('[Users] User Failed And Not Updated', props<{ errorMessage: string }>());

export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());

export const userDeleted = createAction('[Users] User Deleted', props<{ userMeetup: MeetupBackendUser }>());

export const userFailedinDeletion = createAction('[Users] User Failed And Not Deleted', props<{ errorMessage: string }>());



export const createUser = createAction('[Users] Create User', props<{ userCreateObj: UserCreateObj }>());

export const userCreated = createAction('[Users] User Created', props<{userCreateObj : any }> () );

export const userFailedinCreation = createAction('[Users] User Failed And Not Created', props<{
	errorMessage: string
}>());


