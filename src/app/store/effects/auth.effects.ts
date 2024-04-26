// auth.effects.ts

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ user }) =>
        this.authService.login(user).pipe(
          map((authToken) => AuthActions.loginSuccess({ authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
	
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ userData }) =>
        this.authService.signup(userData).pipe(
          map((authToken) => AuthActions.loginSuccess({ authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

	logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        this.authService.logout();
        return EMPTY; 
      }),
      catchError((error) => of(AuthActions.logoutFailure({ error })))
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
