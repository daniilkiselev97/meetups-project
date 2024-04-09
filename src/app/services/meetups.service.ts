import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  combineLatest, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MeetupBackend, Meetup, MeetupCreated } from '../models/meetup.models';
import { AuthService } from './auth.service';
import { User } from '../models/user.models';
import { MeetupsApiService } from './meetups-api.service';

@Injectable({
	providedIn: 'root'
})
export class MeetupsService {

	/**
 	* Данные в этот триггер эмитятся каждый раз, когда нужно заново запросить митапы
 	*/
	private readonly _stateUpdateMeetupsTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);

	constructor(
		private readonly _authService: AuthService,
		private readonly _meetupsApiService: MeetupsApiService
	) {
	}

	/**
 	* Отдает все митапы. Данные в потоке обновляются каждый раз, когда происходит редактирование, удаление, создание митапов, а также при пойду/не пойду .
 	*/
	 public getAll(): Observable<Meetup[]> { 
		return this._stateUpdateMeetupsTrigger.pipe(
			switchMap(() => this._authService.authUser$),  
			switchMap((authUser) => combineLatest([ 
				of(authUser),
				this._meetupsApiService.getAll(),
			])),
			
			// withLatestFrom(this._meetupsApiService.getAll())// не работатет, если закомментировать switchMap выше
			// tap((data) => console.log(data)),
			map(([authUser, meetupsForBackend]) =>
				meetupsForBackend
				.filter((meetupForBackend) => meetupForBackend.owner !== null)
				.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
					authUser, meetupForBackend
				))
			)
		)
	}

	/**
 	* Отдает все созданные митапы авторизованного пользователя.  Данные в потоке обновляются каждый раз, когда происходит редактирование, удаление, создание митапов, а также при пойду/не пойду .
 	*/
	public getAllMy(): Observable<Meetup[]> {
		return this.getAll().pipe(
			map(meetups => meetups.filter(meetupForAuthUser => meetupForAuthUser.authUserIsOwner))
		);

	}

	public registerUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._meetupsApiService.registerUserFromMeetup(user, meetup)
		.pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null))
		);
	}

	public removeUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._meetupsApiService.removeUserFromMeetup(user, meetup)
		.pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null)) 
		);

	}

	public changeMeetup(meetup: MeetupBackend, id: number): Observable<MeetupBackend> {
		return this._meetupsApiService.changeMeetup(meetup, id).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null)),
			// tap(console.log)
		);
	}

	public createMeetup(meetup: MeetupCreated): Observable<MeetupBackend> {
		return this._meetupsApiService.createMeetup(meetup).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null)),
			// tap(console.log)
		);
	}

	public deleteMeetup(idMeetup: number): Observable<MeetupBackend> {
		return this._meetupsApiService.deleteMeetup(idMeetup).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null))
		);
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
