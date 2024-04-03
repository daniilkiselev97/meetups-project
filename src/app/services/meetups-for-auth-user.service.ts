import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, map } from 'rxjs';
import { MeetupBackend, MeetupForAuthUser } from '../models/meetup.models';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';

@Injectable({
	providedIn: 'root'
})
export class MeetupsForAuthUser {

	private readonly _baseUrl: string = `${environment.backendOrigin}/meetup`;
	private readonly _stateMeetups: BehaviorSubject<MeetupForAuthUser[]> = new BehaviorSubject<MeetupForAuthUser[]>([]);

	constructor(
		private readonly _authService: AuthService,
		private readonly _http: HttpClient,
	) {
		this._init();
	}

	public getAll() {
		return combineLatest([  //слушает 2 потока и если что то изменяется в одном из потоков то заново запускает subscribe
			this._http.get<MeetupBackend[]>(this._baseUrl),
			this._authService.authUser$
		]).pipe(
			map(([meetupsForBackend, authUser]) => {

				return meetupsForBackend.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
					authUser, meetupForBackend
					
				))
			})
		)
	}

	private _whetherUserIsOwnerOfMeetup(user: User, meetupForBackend: MeetupBackend): boolean {
		const idUser = user.id;
		const idOwnerUser = meetupForBackend.owner.id;

		return idUser === idOwnerUser;
	}

	private _isUserRegisteredForMeetup(user: User, meetupForBackend: MeetupBackend): boolean {
		const idUser = user.id;
		let isUserRegistered = false;

		for (const registeredUser of meetupForBackend.users) {
			if (registeredUser.id === idUser) {
				isUserRegistered = true;
				break;
			}
		}

		return isUserRegistered;
	}

	private _convertMeetupForBackendToMeetupForAuthUser(authUser: User | null, meetupForBackend: MeetupBackend): MeetupForAuthUser {
		const authUserIsOwner = authUser ? this._whetherUserIsOwnerOfMeetup(authUser, meetupForBackend) : false
		const registeredForMeetup = authUser ? this._isUserRegisteredForMeetup(authUser, meetupForBackend) : false

		return {
			...meetupForBackend,
			authUser : authUser ? authUser : null,
			authUserIsOwner,
			registeredForMeetup
		}
	}


	private _init(): void {

	}


}
