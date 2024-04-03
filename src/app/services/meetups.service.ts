import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map, of, switchMap, tap, withLatestFrom, zip } from 'rxjs';
import { MeetupBackend, Meetup } from '../models/meetup.models';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeetupBackendUser, User } from '../models/user.models';

@Injectable({
	providedIn: 'root'
})
export class MeetupsService {

	private readonly _baseUrl: string = `${environment.backendOrigin}/meetup`;
	private readonly _stateMyMeetups: BehaviorSubject<Meetup[]> = new BehaviorSubject<Meetup[]>([]);
	private readonly _stateAllMeetups: BehaviorSubject<Meetup[]> = new BehaviorSubject<Meetup[]>([]);
	private readonly _stateUpdateMeetupsTrigger: BehaviorSubject<null> = new BehaviorSubject<null>(null);
	public readonly myMeetups$: Observable<Meetup[]> = this._stateMyMeetups.asObservable();
	public readonly allMeetups$: Observable<Meetup[]> = this._stateAllMeetups.asObservable();


	constructor(
		private readonly _authService: AuthService,
		private readonly _http: HttpClient,
	) {
		this._init();
	}



	public getAll(): Observable<Meetup[]> { //слушает все митапы и будет заново делать запрос если авт пользователь меняется
		// return combineLatest([  //слушает 2 потока и если что то изменяется в одном из потоков то заново запускает subscribe
		// 	this._http.get<MeetupBackend[]>(this._baseUrl), //при старте все потоки должны испустить значение
		// 	this._authService.authUser$,
		// 	this._stateUpdateMeetupsTrigger
		// ]).pipe(
		// 	map(([meetupsForBackend, authUser]) =>
		// 		meetupsForBackend.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
		// 			authUser, meetupForBackend
		// 		))
		// 	)
		// );
		return this._stateUpdateMeetupsTrigger.pipe( //
			switchMap(() => this._authService.authUser$),  //переключить на другой поток
			switchMap((authUser) => combineLatest([
				this._http.get<MeetupBackend[]>(this._baseUrl),
				of(authUser) //преобразовать какие то данные в Observable	
			])),
			map(([meetupsForBackend, authUser]) =>
				meetupsForBackend.map((meetupForBackend) => this._convertMeetupForBackendToMeetupForAuthUser(
					authUser, meetupForBackend
				))
			)
		)
	}

	public getAllMy(): Observable<Meetup[]> {
		return this.getAll().pipe(
			map(meetups => meetups.filter(meetupForAuthUser => meetupForAuthUser.authUserIsOwner))
		)
	}

	public registerUserForMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._http.put<MeetupBackend>(this._baseUrl, {
			idMeetup: meetup.id,
			idUser: user.id
		}).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null))
		)
	}

	public removeUserFromMeetup(user: User, meetup: Meetup): Observable<MeetupBackend> {
		return this._http.delete<MeetupBackend>(this._baseUrl, {
			body: {
				idMeetup: meetup.id,
				idUser: user.id
			}
		}).pipe(
			tap(meetupBackend => this._stateUpdateMeetupsTrigger.next(null))
		)

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
			console.log(meetups)
		})
		const subsGetAllMy = this._getAllMyAndUpdateState().subscribe(meetups => {
			console.log(meetups)
		})
	}
}
