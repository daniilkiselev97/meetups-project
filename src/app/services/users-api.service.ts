import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthBackend, UserBackend } from '../models/user.models';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/user`;


	constructor(
		private readonly _http: HttpClient
	) { }

	public getAll(): Observable<UserAuthBackend[]> {
		return this._http.get<UserAuthBackend[]>(this._baseUrl)
	}
}
