import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meetup, MeetupBackend, MeetupCreated } from '../models/meetup.models';
import { Observable } from 'rxjs';
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
		return this._http.get<MeetupBackend[]>(this._baseUrl);
	}

	public registerUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
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

	public changeMeetup(meetup: MeetupBackend, id: number): Observable<MeetupBackend> {
		return this._http.put<MeetupBackend>(`${this._baseUrl}/${id}`, meetup);
	}

	public createMeetup(meetup: MeetupCreated): Observable<MeetupBackend> {
		return this._http.post<MeetupBackend>(this._baseUrl, meetup);
	}

	public deleteMeetup(idMeetup: number): Observable<MeetupBackend> {
		return this._http.delete<MeetupBackend>(`${this._baseUrl}/${idMeetup}`);
	}
}
