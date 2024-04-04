import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meetup, MeetupBackend } from '../models/meetup.models';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class MeetupsApiService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/meetup`;

  constructor(
		private readonly _http: HttpClient,
	) { }

	public getAll(): Observable<MeetupBackend[]> {
		return this._http.get<MeetupBackend[]>(this._baseUrl).pipe(
			catchError((err) => throwError(() => err))
		);
	}

	public registerUserForMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._http.put<MeetupBackend>(this._baseUrl, {
			idMeetup: meetup.id,
			idUser: user.id
		});
	}

	public removeUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._http.delete<MeetupBackend>(this._baseUrl, {
			body: {
				idMeetup: meetup.id,
				idUser: user.id
			}
		});

	}
}
