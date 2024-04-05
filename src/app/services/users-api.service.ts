import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserBackend } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/user`;


  constructor(
		private readonly _http: HttpClient
		
	) { }

	public getAll(): Observable<UserBackend[]> {
		return this._http.get<UserBackend[]>(this._baseUrl);
	}
}
