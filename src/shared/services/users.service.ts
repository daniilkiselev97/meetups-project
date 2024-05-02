import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable, catchError, combineLatest, filter, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { UserBackend, UserCreateObj, UserUpdateObj } from '../models/user.models';
import { AuthService } from './auth.service';
import { AssigningRolesToBackend } from '../models/roles.models';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	public readonly _stateUpdateUsersTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);

	constructor(
		private readonly _usersApiService: UsersApiService,
		private readonly _authService: AuthService
	) {

	}


	public getAll(): Observable<UserBackend[]> {
		return this._authService.authUser$.pipe(
			switchMap((authUser) => {
				if (authUser === null) {
					return of([]);
				} else {
					return this._usersApiService.getAll();
				}
			}),
			map(users => users.sort((a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase())))
		);
	}


	public updateUser(userUpdateObj: UserUpdateObj) {
		const areUpdateRoles = userUpdateObj.newRoles.length !== 0;
		return forkJoin([
			this._usersApiService.updateUser(userUpdateObj),
			of(areUpdateRoles)
		]).pipe(
			filter(([updatedUser, areUpdateRoles]) => areUpdateRoles),
			switchMap(([updatedUser, _]) => {
				return this._usersApiService.updateUserRole(userUpdateObj).pipe(
					map(updatedUserRole => ({ updatedUser, updatedUserRole }))
				);
			}),
			catchError(error => {
				return throwError(error);
			})
		);
	}

	public createUser(userCreateObj: UserCreateObj) {
		const areUpdateRoles = userCreateObj.newRoles.length !== 0;
		return combineLatest([
			this._usersApiService.createUser(userCreateObj),
			of(areUpdateRoles)
		]).pipe(
			switchMap(([updatedUser, areUpdateRoles]) => {
				if (!areUpdateRoles) {
					return of(updatedUser);
				}
				return this.getAll().pipe(
					switchMap((users) => {
						const foundCreatedUser = users.find((user: { email: string; fio: string; }) =>
							(user.email === userCreateObj.email) && (user.fio === userCreateObj.fio)
						);
						if (foundCreatedUser === undefined) {
							return throwError(() => new Error(`Пользователь с email ${userCreateObj.email} не найден`))
						}

						return this._usersApiService.updateUserRole({
							...foundCreatedUser,
							newRoles: userCreateObj.newRoles
						})
					})
				);
			}),
		);
	}





	public deleteUser(idUser: number) {
		return this._usersApiService.deleteUser(idUser)
	}
}
