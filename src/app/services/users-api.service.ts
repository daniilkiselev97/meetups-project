import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MeetupBackendUser, UserAuthBackend, UserBackend, UserBackendUpdate, UserBackendUpdateRole, UserUpdateObj } from '../models/user.models';
import { Observable, tap } from 'rxjs';

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
		})

	}

	public updateUserRole(userUpdateObj: UserUpdateObj): Observable<UserBackendUpdateRole> {
		return this._http.put<UserBackendUpdateRole>(`${this._baseUrl}/role`, {
			name: userUpdateObj.newRole || 'Неопределенная роль',  //может быть null
			id: userUpdateObj.id
		})
	}

	public deleteUser(user: UserBackend): Observable<MeetupBackendUser> {
		return this._http.delete<MeetupBackendUser>(`${this._baseUrl}/${user.id}`)
	}
}
