import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserBackendRole } from '../models/user-roles.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersRolesApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/role`;


  constructor(
		private readonly _http: HttpClient

	) { }

	getAll(): Observable<UserBackendRole[]> {
		return this._http.get<UserBackendRole[]>(this._baseUrl);
	}
}
