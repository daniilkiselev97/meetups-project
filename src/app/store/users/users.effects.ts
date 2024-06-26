import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { UsersService } from '../../../shared/services/users.service'
import * as UsersActions from './users.actions';
import { of, throwError } from 'rxjs';
import { MeetupBackendUser } from 'src/shared/models/user.models';

@Injectable()
export class UsersEffects {

	constructor(
		private actions$: Actions,
		private usersService: UsersService
	) { }

	loadUsers$ = createEffect(() => this.actions$.pipe(
		ofType(UsersActions.loadUsers),
		exhaustMap(() => this.usersService.getAll()),
		map((users) => UsersActions.loadUsersSuccess({ users })),
		catchError(error => of(UsersActions.loadUsersFailure({ errorMessage: error.message })))
	))

	updateUser$ = createEffect(() => this.actions$.pipe(
		ofType(UsersActions.updateUser),
		exhaustMap(({ userUpdateObj }) => this.usersService.updateUser(userUpdateObj)),
		map((userUpdateObj) => UsersActions.userUpdated(userUpdateObj))),

	)

	deleteUser$ = createEffect(() => this.actions$.pipe(
		ofType(UsersActions.deleteUser),
		exhaustMap(({ id }) => this.usersService.deleteUser(id)),
		map((userMeetup) => UsersActions.userDeleted({ userMeetup })),
		tap(console.log),
		catchError(error => of(UsersActions.userFailedinDeletion({ errorMessage: error.message })))
	))

	createUser$ = createEffect(() => this.actions$.pipe(
		ofType(UsersActions.createUser),
		exhaustMap(({ userCreateObj }) => this.usersService.createUser(userCreateObj)),
		tap(console.log),
		map(userCreateObj => UsersActions.userCreated({ userCreateObj })),
		catchError(error => of(UsersActions.userFailedinDeletion({ errorMessage: error.message })))
	));







}
