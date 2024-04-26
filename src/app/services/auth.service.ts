import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthToken, UserLogin, UserRegistrationData } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { User, UserAuthBackend } from '../models/user.models';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth.state';
import * as AuthActions from '../store/actions/auth.actions'; 


@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _localStorageKey: string = 'token';
	private readonly _baseUrl: string = `${environment.backendOrigin}/auth`;
	private readonly _stateAuthUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
	private readonly _stateToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
	public readonly authUser$: Observable<User | null> = this._stateAuthUser.asObservable();
	public readonly isAuth$: Observable<boolean> = this._stateAuthUser.pipe(
		map((user) => {
			if (user === null) return false;
			return true;
		})
	);
	public token$: Observable<string | null> = this._stateToken.asObservable();

	get token(): string | null {
		return this._localStorageService.get<string>(this._localStorageKey);
	}

	constructor(
		private readonly _http: HttpClient,
		private readonly _localStorageService: LocalStorageService,
		private _router: Router,
		private store: Store<AuthState>
	) {
		this._init();
	}


	login(user: UserLogin): Observable<AuthToken> {
    return this._http.post<any>(`${this._baseUrl}/login`, user).pipe(
      tap((authToken: AuthToken) => {
        this.store.dispatch(AuthActions.loginSuccess({ authToken }));
        this._syncLogin(authToken.token, true);
        this._router.navigateByUrl('my-meetups');
      }),
      catchError((err) => {
        this.store.dispatch(AuthActions.loginFailure({ error: err }));
        return this.catchErrorFunc(err);
      })
    );
  }


	public signup(user: UserRegistrationData): Observable<AuthToken> {
		return this._http.post<AuthToken>(`${this._baseUrl}/registration`, user).pipe(
			tap((authToken: AuthToken) => {
				this.store.dispatch(AuthActions.loginSuccess({ authToken }));
				this._syncLogin(authToken.token, true);
				this._router.navigateByUrl('my-meetups');
			}),
			catchError((err) => {
				this.store.dispatch(AuthActions.loginFailure({ error: err }));
				return this.catchErrorFunc(err);
			})
		);
	}
	
	public logout(): void {
		this._stateAuthUser.next(null);
		this._stateToken.next(null);
		this._localStorageService.delete(this._localStorageKey);
		this._router.navigateByUrl('login');
	}


	private _init(): void {
		const token = this._localStorageService.get(this._localStorageKey);

		if (token !== null) {
			this._syncLogin(token, false);
		}
	}

	private _syncLogin(token: string, updatedLocalStorage: boolean): void {
		const userBackend = this._getUserFromToken(token);
		const user = this._convertUserBackendToUser(userBackend);
		this._stateToken.next(token);
		this._stateAuthUser.next(user);

		if (updatedLocalStorage === true) {
			this._localStorageService.set(this._localStorageKey, token);
		}
	}

	private _convertUserBackendToUser(userBackend: UserAuthBackend): User {
		const rolesObj = {
			isAdmin: false,
			isUser: false
		};

		const roleNames = userBackend.roles.map(role => role.name);

		for (const roleName of roleNames) {
			if (roleName === 'ADMIN') {
				rolesObj.isAdmin = true
			}
			if (roleName === 'USER') {
				rolesObj.isUser = true
			}
		}

		return {
			id: userBackend.id,
			email: userBackend.email,
			rolesObj: rolesObj,
			rolesArr: userBackend.roles
		};
	}

	private _getUserFromToken(token: string): UserAuthBackend {
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
		return JSON.parse(jsonPayload);
	}

	private catchErrorFunc(err: any) {
		return throwError(() => {
			const createMessageError = (err: any) => {
				if (Array.isArray(err.error)) return err.error.join(', ');
				if (typeof err.error === 'object' && err.error.message) return err.error.message;
				if (err.error instanceof ProgressEvent) return err.message;
				return 'Непредвиденная ошибка';
			};
			const message = createMessageError(err);
			console.error(err);
			return new Error(`Ошибка при регистрации: ${message}`);
		});

	}

}