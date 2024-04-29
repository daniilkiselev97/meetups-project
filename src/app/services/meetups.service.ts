import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  combineLatest, map, of, switchMap, tap } from 'rxjs';
import { MeetupBackend, Meetup, MeetupCreated } from '../models/meetup.models';
import { AuthService } from './auth.service';
import { User } from '../models/user.models';
import { MeetupsApiService } from './meetups-api.service';

@Injectable({
	providedIn: 'root'
})
export class MeetupsService {

	constructor(
		private readonly _authService: AuthService,
		private readonly _meetupsApiService: MeetupsApiService
	) {
	}

	public getAll(): Observable<Meetup[]> { 
    return this._authService.authUser$.pipe(
        switchMap((authUser) => combineLatest([ 
            of(authUser),
            this._meetupsApiService.getAll(),
        ])),
        map(([authUser, meetupsForBackend]) =>
            meetupsForBackend
            .filter((meetupForBackend) => meetupForBackend.owner !== null)
            .map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
                authUser, meetupForBackend
            ))
        ),
    );
}
	

	public getAllMy(): Observable<Meetup[]> {
		return this.getAll().pipe(
			map(meetups => meetups.filter(meetupForAuthUser => meetupForAuthUser.authUserIsOwner))
		);
	}

	public registerUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._meetupsApiService.registerUserFromMeetup(user, meetup)

	}

	public removeUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._meetupsApiService.removeUserFromMeetup(user, meetup)
	

	}

	public changeMeetup(meetup: MeetupBackend, id: number): Observable<MeetupBackend> {
		return this._meetupsApiService.changeMeetup(meetup, id)
	}

	public createMeetup(meetup: MeetupCreated): Observable<MeetupBackend> {
		return this._meetupsApiService.createMeetup(meetup)
		
	}

	public deleteMeetup(idMeetup: number): Observable<MeetupBackend> {
		return this._meetupsApiService.deleteMeetup(idMeetup)
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

	private _convertMeetupForBackendToMeetupForAuthUser(authUser: User | null, meetupForBackend: MeetupBackend): Meetup {
		const authUserIsOwner = authUser === null ? false : this._whetherUserIsOwnerOfMeetup(authUser, meetupForBackend);
		const registeredForMeetup = authUser === null ? false : this._isUserRegisteredForMeetup(authUser, meetupForBackend);

		return {
			...meetupForBackend,
			authUser: authUser ? authUser : null,
			authUserIsOwner,
			registeredForMeetup
		};
	}
}
