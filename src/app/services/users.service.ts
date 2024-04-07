import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
import { User, UserAuthBackend, UserBackend, UserUpdateObj } from '../models/user.models';
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

	public updateUser(userUpdateObj: UserUpdateObj) {
		const isUpdateRole = userUpdateObj.newRole !== null;

		return combineLatest([
			this._usersApiService.updateUser(userUpdateObj),
			of(isUpdateRole)
		]).pipe(
			tap(() => this._stateUpdateUsersTrigger.next(null)), // в любом случае посылается сигнал
			filter(([updatedUser, isUpdateRole]) => isUpdateRole), //фильтруем isUpdateRole === true и идет вниз делать запрос
			switchMap(() => this._usersApiService.updateUserRole(userUpdateObj)), //обновление роли 
			tap(() => this._stateUpdateUsersTrigger.next(null)), //заново запустить триггер

		)
	}

	public deleteUser(user: UserBackend) {
		return this._usersApiService.deleteUser(user).pipe(
			tap(user => this._stateUpdateUsersTrigger.next(null))
		);
	}

	private _getAll(): Observable<UserBackend[]> {

		return this._stateUpdateUsersTrigger.pipe(
			switchMap(() => this._authService.authUser$),
			switchMap((authUser) => {
				if (authUser === null) return of([]); //чтобы не получать всех пользователей если не автаризован
				return this._usersApiService.getAll()
			}), 
		)

		// return this._usersApiService.getAll()

		// return this._stateUpdateMeetupsTrigger.pipe(
			// switchMap(() => this._authService.authUser$),  //переключить на другой поток 
			// tap(console.log),
			// switchMap(() => combineLatest([
				// this._usersApiService.getAll(),
				// this._usersRolesApiService.getAll()
			// ])),
			// map(([usersBackend, userBackendRoles]) => this._convertUsersBackendToUsers(usersBackend, userBackendRoles))
			// switchMap(() => this._usersApiService.getAll()),
			// switchMap((authUser) => combineLatest([ //чтобы в следующем pipe map ,были 2 переменные
			// 	this._meetupsApiService.getAll(),
			// 	of(authUser) //преобразовать какие то данные в Observable	
			// ])),
			// map((users) => )
		// )
	}

	private _getAllAndUpdateState(): Observable<UserBackend[]> { //внутри потока
		return this._getAll().pipe(
			tap((users) => this._stateUsers.next(users))
		);
	}

	private _init(): void {
		const subsGetAll = this._getAllAndUpdateState().subscribe(users => {
			subsGetAll.unsubscribe();
		})
		
	}

	// private _convertUsersBackendToUsers(usersBackend: UserBackend[], userBackendRoles: UserBackendRole[]): User[] {
	// 	return []
	// }
}
