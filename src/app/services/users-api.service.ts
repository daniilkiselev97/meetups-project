import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MeetupBackendUser, UserAuthBackend, UserBackend, UserBackendUpdate, UserBackendUpdateRole, UserCreateObj, UserUpdateObj } from '../models/user.models';
import { Observable, map, tap } from 'rxjs';
import { AssigningRolesToBackend } from '../models/roles.models';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/user`;


	constructor(
		private readonly _http: HttpClient
	) { }

	public getAll(): Observable<UserBackend[]> {
		return this._http.get<UserBackend[]>(this._baseUrl)
	}

	public updateUser(userUpdateObj: UserUpdateObj): Observable<UserBackendUpdate> {

		const bodyObj: any = {
			email: userUpdateObj.email,
			fio: userUpdateObj.fio,
		};

		if (userUpdateObj.password !== null) {
			bodyObj.password = userUpdateObj.password
		}
		return this._http.put<UserBackendUpdate>(`${this._baseUrl}/${userUpdateObj.id}`, {
			...bodyObj
		});

	}

	public createUser(userCreateObj: UserCreateObj): Observable<UserCreateObj> {
		return this._http.post<void>(`${environment.backendOrigin}/auth/registration`, {
			...userCreateObj
		}).pipe(
			map(() => userCreateObj)
		);
	}

	public updateUserRole(userUpdateObj: UserUpdateObj): Observable<AssigningRolesToBackend> {
		const rolesNames = userUpdateObj.newRoles.map((role) => role.name)
		
		
		return this._http.post<AssigningRolesToBackend>(`${this._baseUrl}/role`, {
			// names: rolesNames.length ?  rolesNames :  'Неопределенная роль',  //может быть null
			names: rolesNames,
			userId: userUpdateObj.id
		})
	}



	public deleteUser(idUser: number): Observable<MeetupBackendUser> {
		return this._http.delete<MeetupBackendUser>(`${this._baseUrl}/${idUser}`)
	}
}
