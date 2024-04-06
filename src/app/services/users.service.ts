import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';
import { User, UserAuthBackend, UserBackend } from '../models/user.models';
import { UsersRolesApiService } from './users-roles-api.service';
import { UserBackendRole } from '../models/user-roles.models';
import { Meetup } from '../models/meetup.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	private readonly _stateUsers: BehaviorSubject<UserAuthBackend[]> = new BehaviorSubject<UserAuthBackend[]>([]);
	public readonly users$: Observable<UserAuthBackend[]> = this._stateUsers.asObservable();

	// private readonly _stateUpdateMeetupsTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor(
		private readonly _usersApiService: UsersApiService,
		private readonly _usersRolesApiService: UsersRolesApiService
	) {
		this._init()
	 }

	private _getAll() {

		return this._usersApiService.getAll()
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

	private _init(): void {
		const subsGetAll = this._getAll().subscribe(users => {
			this._stateUsers.next(users)
		})
		
	}

	// private _convertUsersBackendToUsers(usersBackend: UserBackend[], userBackendRoles: UserBackendRole[]): User[] {
	// 	return []
	// }
}
