import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthToken, UserInfo, UserLogin, UserRegistrationData } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { User, UserAuthBackend } from '../models/user.models';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.models';
import * as AuthActions from '../store/auth/auth.actions'
import { selectIsAuth, selectToken, selectUser } from '../store/auth/auth.selectors';
import * as Actions from '../store/auth/auth.actions'



@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _localStorageKey: string = 'token';
	private readonly _baseUrl: string = `${environment.backendOrigin}/auth`;
	private readonly _stateAuthUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
	private readonly _stateToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
	public readonly authUser$: Observable<User | null> = this._store.select(selectUser)

	public readonly isAuth$: Observable<boolean> = this._store.select(selectIsAuth)
	public token$: Observable<string | null> = this._store.select(selectToken);

	get token(): string | null {
		return this._localStorageService.get<string>(this._localStorageKey);
	}

	constructor(
		private readonly _http: HttpClient,
		private readonly _localStorageService: LocalStorageService,
		private _router: Router,
		private _store: Store<AuthState>
	) {
		this._init();
	}


	login(user: UserLogin): Observable<UserInfo> {
		return this._http.post<any>(`${this._baseUrl}/login`, user).pipe(
			map((authToken: AuthToken) => {
				const syncLoginInfo = this._syncLogin(authToken.token, true);
				this._router.navigateByUrl('users');
				return syncLoginInfo;
			}),
			catchError((err) => {
				return this.catchErrorFunc(err);
			})
		);
	}


	public signup(user: UserRegistrationData): Observable<UserInfo> {
		return this._http.post<AuthToken>(`${this._baseUrl}/registration`, user).pipe(
			map((authToken: AuthToken) => {
				const syncLoginInfo = this._syncLogin(authToken.token, true);
				this._router.navigateByUrl('my-meetups');
				return syncLoginInfo;
			}),
			catchError((err) => {
				return this.catchErrorFunc(err);
			})
		);
	}

	public logout(): void {
		this._localStorageService.delete(this._localStorageKey);
		this._router.navigateByUrl('login');
	}
	
	


	private _init(): void {
		const token = this._localStorageService.get(this._localStorageKey);

		if (token !== null) {
			this._syncLogin(token, false);
		}
	}

	private _syncLogin(token: string, updatedLocalStorage: boolean): UserInfo {
		const userBackend = this._getUserFromToken(token);
		const user = this._convertUserBackendToUser(userBackend);
		this._stateToken.next(token);
		this._stateAuthUser.next(user);

		if (updatedLocalStorage === true) {
			this._localStorageService.set(this._localStorageKey, token);
		}

		return {
			user: user,
			token: token
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
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
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