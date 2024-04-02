import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthToken, IsAuth, UserLogin, UserRegistrationData } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Route, Router } from '@angular/router';
import { User, UserBackend, UserRoles } from '../models/user.models';


@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _localStorageKey: string = 'token';
	private readonly _baseUrl: string = `${environment.backendOrigin}/auth`;
	private readonly _stateAuthUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
	public readonly authUser$: Observable<User | null> = this._stateAuthUser.asObservable();
	public readonly isAuth$: Observable<boolean> = this._stateAuthUser.pipe(
		map((user) => {
			if (user === null) return false;
			// console.log(user)
			return true;
		})
	);

	get token(): string | null {
		return this._localStorageService.get<string>(this._localStorageKey);
	}

	constructor(
		private readonly _http: HttpClient,
		private readonly _localStorageService: LocalStorageService,
		private _router: Router
	) {
		this._init();
	}

	public login(user: UserLogin): Observable<AuthToken> {
		return this._http.post<AuthToken>(`${this._baseUrl}/login`, user).pipe(
			catchError((err) => this.catchErrorFunc(err)),
			tap(({ token }) => {
				this._syncLogin(token, true);
				this._router.navigateByUrl('my-meetups');
			})
		)
	}

	public signup(user: UserRegistrationData): Observable<AuthToken> {
		return this._http.post<AuthToken>(`${this._baseUrl}/registration`, user).pipe(
			catchError((err) => this.catchErrorFunc(err)),
			tap(({ token }) => {
				this._syncLogin(token, true);
				this._router.navigateByUrl('my-meetups');
			})
		)
	}


	public logout(): void {
		this._stateAuthUser.next(null);
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
		// console.log(userBackend)
		const user = this._convertUserBackendToUser(userBackend);

		this._stateAuthUser.next(user)
		if (updatedLocalStorage === true) {
			this._localStorageService.set(this._localStorageKey, token);
		}
	}

	private _convertUserBackendToUser(userBackend: UserBackend): User {
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
			...userBackend,
			roles: rolesObj
		};
	}

	private _getUserFromToken(token: string): UserBackend {
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