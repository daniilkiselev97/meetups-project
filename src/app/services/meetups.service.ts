import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, of, switchMap, tap, withLatestFrom, zip } from 'rxjs';
import { MeetupBackend, Meetup, MeetupCreated } from '../models/meetup.models';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeetupBackendUser, User } from '../models/user.models';
import { MeetupsApiService } from './meetups-api.service';

@Injectable({
	providedIn: 'root'
})
export class MeetupsService {

	private readonly _stateMyMeetups: BehaviorSubject<Meetup[]> = new BehaviorSubject<Meetup[]>([]);
	private readonly _stateAllMeetups: BehaviorSubject<Meetup[]> = new BehaviorSubject<Meetup[]>([]);
	private readonly _stateUpdateMeetupsTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);
	public readonly myMeetups$: Observable<Meetup[]> = this._stateMyMeetups.asObservable();
	public readonly allMeetups$: Observable<Meetup[]> = this._stateAllMeetups.asObservable();


	constructor(
		private readonly _authService: AuthService,
		private readonly _meetupsApiService: MeetupsApiService
	) {
		this._init();
	}

	public getAll(): Observable<Meetup[]> { //слушает все митапы и будет заново делать запрос если авт пользователь меняется

		return this._stateUpdateMeetupsTrigger.pipe(
			switchMap(() => this._authService.authUser$),  //переключить на другой поток 
			// tap(console.log),
			switchMap((authUser) => combineLatest([ //чтобы в следующем pipe map ,были 2 переменные
				this._meetupsApiService.getAll(),
				of(authUser) //преобразовать какие то данные в Observable	
			])),
			map(([meetupsForBackend, authUser]) =>
				meetupsForBackend.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
					authUser, meetupForBackend
				))
			)
			// tap(console.log)
		)
	}

	public getAllMy(): Observable<Meetup[]> {
		return this.getAll().pipe(
			map(meetups => meetups.filter(meetupForAuthUser => meetupForAuthUser.authUserIsOwner))
		);

	}

	public registerUserForMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._meetupsApiService.registerUserForMeetup(user, meetup)
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

	public changeMeetup(meetup: MeetupBackend, id: string): Observable<MeetupBackend> {
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

	public deleteMeetup(idMeetup: string): Observable<MeetupBackend> {
		return this._meetupsApiService.deleteMeetup(idMeetup).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null))
		);
	}

	private _getAllAndUpdateState(): Observable<Meetup[]> {
		return this.getAll().pipe(
			tap(meetups => {
				this._stateAllMeetups.next(meetups);
			})
		);
	}

	private _getAllMyAndUpdateState(): Observable<Meetup[]> {
		return this.getAllMy().pipe(
			tap(meetups => {
				this._stateMyMeetups.next(meetups);
			})
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

	private _init(): void {
		const subsGetAll = this._getAllAndUpdateState().subscribe(meetups => {
			// console.log(meetups)
		})
		const subsGetAllMy = this._getAllMyAndUpdateState().subscribe(meetups => {
			// console.log(meetups)
		})
	}
}
