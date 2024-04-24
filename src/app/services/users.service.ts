import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable, catchError, combineLatest, filter, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { UserBackend, UserCreateObj, UserUpdateObj } from '../models/user.models';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private readonly _stateUpdateUsersTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);

	constructor(
		private readonly _usersApiService: UsersApiService,
		private readonly _authService: AuthService
	) {

	}

	public getAll(): Observable<UserBackend[]> {

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

	// public createUser(userCreateObj: UserCreateObj): Observable<any> {
	// 	const areUpdateRoles = userCreateObj.newRoles.length !== 0;
	// 	return this._usersApiService.createUser(userCreateObj).pipe(
	// 		tap(() => this._stateUpdateUsersTrigger.next(null)),
	// 		filter(() => true),
	// 		switchMap(() => this.getAll()),
	// 		switchMap((users) => {
	// 			const foundCreatedUser = users.find(user =>
	// 				(user.email === userCreateObj.email) && (user.fio === userCreateObj.fio)
	// 			);

	// 			if (!foundCreatedUser) {
	// 				throw new Error(`Пользователь с email ${userCreateObj.email} не найден`);
	// 			}


	// 			return this._usersApiService.updateUserRole({
	// 				...foundCreatedUser,
	// 				newRoles: userCreateObj.newRoles
	// 			});
	// 		}),
	// 		tap(() => this._stateUpdateUsersTrigger.next(null))
	// 	);
	// }

	public createUser(userCreateObj: UserCreateObj) {
		const areUpdateRoles = userCreateObj.newRoles.length !== 0;
		return combineLatest([
			this._usersApiService.createUser(userCreateObj),
			of(areUpdateRoles)
		]).pipe(
			tap(() => this._stateUpdateUsersTrigger.next(null)), 
			filter(([updatedUser, areUpdateRoles]) => areUpdateRoles), 
			switchMap(() => this.getAll()),
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
}
