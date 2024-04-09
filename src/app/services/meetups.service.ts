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

	public getAll(): Observable<Meetup[]> { 
		return this._stateUpdateMeetupsTrigger.pipe(
			switchMap(() => this._authService.authUser$),  
			switchMap((authUser) => combineLatest([ 
				of(authUser),
				this._meetupsApiService.getAll(),
			])),
			
			// withLatestFrom(this._meetupsApiService.getAll()),
			tap((data) => console.log(data)),
			map(([authUser, meetupsForBackend]) =>
				meetupsForBackend
				.filter((meetupForBackend) => meetupForBackend.owner !== null)
				.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
					authUser, meetupForBackend
				))
			)
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
