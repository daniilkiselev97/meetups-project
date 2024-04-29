import { createAction, props } from '@ngrx/store';
import { MeetupBackendUser, UserBackend, UserBackendUpdate, UserCreateObj, UserUpdateObj } from '../../models/user.models';
import { AssigningRolesToBackend } from 'src/app/models/roles.models';
import { Observable } from 'rxjs';

export const loadUsers = createAction('[Users] Get Users');

export const loadUsersSuccess = createAction('[Users] Get Users Success', props<{ users: UserBackend[] }>());

export const loadUsersFailure = createAction('[Users] Get Users Failure', props<{ errorMessage: string }>());


export const updateUser = createAction('[Users] Update User', props<{ userUpdateObj: UserUpdateObj }>());

// export const updateUserRole = createAction(
//   '[User] Update User Role',
//   props<{ userUpdateObj: UserUpdateObj }>()
// );

// export const updateUserAndRoleSuccess = createAction(
//   '[User] Update User and Role Success',
//   props<{ updatedUser: UserUpdateObj }>()
// );

export const userUpdated = createAction('[Users] User Updated ', props<{ updatedUser: 							 UserBackendUpdate;
	updatedUserRole: AssigningRolesToBackend; }>());
		
export const userFailedInUpdate = createAction('[Users] User Failed And Not Updated', props<{ errorMessage: string }>());








// export const updateUserAndRoleFailure = createAction(
//   '[User] Update User and Role Failure',
//   props<{ error: any }>()
// );

// export const createUser = createAction('[Users] Create User', props<{ userCreateObj: UserCreateObj }>());
// export const userCreared = createAction('[Users] User Created', props<{ userCreateObj: UserCreateObj }>());

// export const deleteUser = createAction('[Users] Delete User', props<{ idUser: number }>());

// export const userDeletd = createAction('[Users] User Deleted ', props<{ user: Observable<MeetupBackendUser> }>());
