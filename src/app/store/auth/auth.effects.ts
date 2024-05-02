import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap, throwError } from "rxjs";
import { AuthService } from "src/shared/services/auth.service";
import * as AuthActions from 'src/app/store/auth/auth.actions';

@Injectable()
export class AuthEffects {
	constructor(
		private readonly _actions$: Actions,
		private readonly _authService: AuthService,

	) { }

	public login$ = createEffect(() => (
		this._actions$.pipe(
			ofType(AuthActions.login),
			exhaustMap(({ userLogin }) => this._authService.login(userLogin)),
			map(userInfo => AuthActions.loginSuccess({ userInfo })),
			catchError(error => throwError(() => of(AuthActions.loginFailed({
				errorMessage: error.message
			}))))
		)
	));


	public logout$ = createEffect(() => (
		this._actions$.pipe(
			ofType(AuthActions.logout),
			tap(() => this._authService.logout()),
			map(() => AuthActions.logoutSuccess()),
		)
	));


	public signup$ = createEffect(() => (
		this._actions$.pipe(
			ofType(AuthActions.signup),
			exhaustMap(({ userSignup }) => this._authService.signup(userSignup)),
			map(userInfo => AuthActions.signupSuccess({ userInfo })),
			catchError(error => throwError(() => of(AuthActions.signupFailed({
				errorMessage: error.message
			})))),
		)
	));
}

