import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service'
import * as UsersActions from './users.actions';
import { of, throwError } from 'rxjs';
import { MeetupBackendUser } from 'src/app/models/user.models';

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
		exhaustMap(({userUpdateObj}) => this.usersService.updateUser(userUpdateObj)),
		tap(console.log),
		map((userUpdateObj) => UsersActions.userUpdated(userUpdateObj))),
		// catchError(error => of(UsersActions.userFailedInUpdate({ errorMessage: error.message })))
	)

	// deleteUser$ = createEffect(() => this.actions$.pipe(
	// 	ofType(UsersActions.deleteUser),
	// 	exhaustMap(({idUser}) => this.usersService.deleteUser(idUser)),
	// 	map(() => UsersActions.userDeletd({ idUser })),
	// ))





}
