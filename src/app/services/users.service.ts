import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable, combineLatest, filter, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';
import { User, UserAuthBackend, UserBackend, UserCreateObj, UserUpdateObj } from '../models/user.models';
import { UsersRolesApiService } from './users-roles-api.service';
import { UserBackendRole } from '../models/user-roles.models';
import { Meetup } from '../models/meetup.models';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private readonly _stateUsers: BehaviorSubject<UserBackend[]> = new BehaviorSubject<UserBackend[]>([]);
	public readonly users$: Observable<UserBackend[]> = this._stateUsers.asObservable();

	private readonly _stateUpdateUsersTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);

	constructor(
		private readonly _usersApiService: UsersApiService,
		private readonly _usersRolesApiService: UsersRolesApiService,
		private readonly _authService: AuthService
	) {
		this._init()
	}

	private _getAll(): Observable<UserBackend[]> {

		return this._stateUpdateUsersTrigger.pipe(
			switchMap(() => this._authService.authUser$),
			switchMap((authUser) => {
				if (authUser === null) return of([]); //чтобы не получать всех пользователей если не автаризован
				return this._usersApiService.getAll()
			}),
			map(users => users.sort(function (a, b) {
				const emailA = a.email.toLowerCase();
				const emailB = b.email.toLowerCase();
				if (emailA < emailB) return -1;
				if (emailA > emailB) return 1;
				return 0;
			}))

		)

	}

	public updateUser(userUpdateObj: UserUpdateObj) {
		const areUpdateRoles = userUpdateObj.newRoles.length !== 0;


		return combineLatest([
			this._usersApiService.updateUser(userUpdateObj),
			of(areUpdateRoles)
		]).pipe(
			tap(() => this._stateUpdateUsersTrigger.next(null)), 
			filter(([updatedUser, areUpdateRoles]) => areUpdateRoles), 
			switchMap(() => this._usersApiService.updateUserRole(userUpdateObj)), 
			tap(() => this._stateUpdateUsersTrigger.next(null)), 
		)
	}

	public createUser(userCreateObj: UserCreateObj) {
		const areUpdateRoles = userCreateObj.newRoles.length !== 0;
		return combineLatest([
			this._usersApiService.createUser(userCreateObj),
			of(areUpdateRoles)
		]).pipe(
			tap(() => this._stateUpdateUsersTrigger.next(null)), 
			filter(([updatedUser, areUpdateRoles]) => areUpdateRoles), 
			switchMap(() => this._getAll()),
			switchMap((users) => {
				const foundCreatedUser = users.find(user => 
					(user.email === userCreateObj.email) && (user.fio ===  userCreateObj.fio)
				);

				if (foundCreatedUser === undefined) {
					return throwError(() => new Error(`Пользователь с email ${userCreateObj.email} не найден`))
				}

				return this._usersApiService.updateUserRole({
					...foundCreatedUser,
					newRoles: userCreateObj.newRoles
				})
			}), 
			tap(() => this._stateUpdateUsersTrigger.next(null)), 
		)
	}

	public deleteUser(idUser: number) {
		return this._usersApiService.deleteUser(idUser).pipe(
			tap(user => this._stateUpdateUsersTrigger.next(null))
		);
	}



	private _getAllAndUpdateState(): Observable<UserBackend[]> { //внутри потока
		return this._getAll().pipe(
			tap((users) => this._stateUsers.next(users))
		);
	}

	private _init(): void {
		const subsGetAll = this._getAllAndUpdateState().subscribe(users => {

		})

	}

}
