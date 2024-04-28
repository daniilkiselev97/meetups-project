import { createAction, props } from '@ngrx/store';
import { MeetupBackendUser, UserBackend, UserCreateObj, UserUpdateObj } from '../../models/user.models';
import { AssigningRolesToBackend } from 'src/app/models/roles.models';
import { Observable } from 'rxjs';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: UserBackend[] }>());

export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

export const updateUser = createAction('[Users] Update User', props<{ userUpdateObj: UserUpdateObj }>());

export const userUpdated = createAction('[Users] User Updated ', props<{ userUpdateObj: Observable<AssigningRolesToBackend> }>());

export const createUser = createAction('[Users] Create User', props<{ userCreateObj: UserCreateObj }>());
export const userCreared = createAction('[Users] User Created', props<{ userCreateObj: UserCreateObj }>());

export const deleteUser = createAction('[Users] Delete User', props<{ idUser: number }>());

export const userDeletd = createAction('[Users] User Deleted ', props<{ user: Observable<MeetupBackendUser> }>());
