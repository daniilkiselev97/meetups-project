import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserBackendRole } from '../models/user.models';
import { Observable, filter, map } from 'rxjs';
import { BackendRole } from '../models/roles.models';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/role`;


  constructor(
		private readonly _http: HttpClient
	) { }

	public getAll(): Observable<BackendRole[]> {
		return this._http.get<BackendRole[]>(this._baseUrl).pipe(
			map((roles) => roles.filter(role => role.name !== '' ))
		)
	}
}
