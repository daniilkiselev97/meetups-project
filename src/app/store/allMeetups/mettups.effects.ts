import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MeetupsActions from './meetups.actions';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MeetupsService } from 'src/app/services/meetups.service';
import { Meetup } from 'src/app/models/meetup.models';


@Injectable()
export class MeetupsEffects {
	constructor(
		private actions$: Actions,
		private meetupsService: MeetupsService
	) { }

	loadMeetups$ = createEffect(() => this.actions$.pipe(
		ofType(MeetupsActions.loadMeetups),
		exhaustMap(() => this.meetupsService.getAll()),
		map((meetups) => MeetupsActions.meetupsLoaded({ meetups })),
		catchError(error => throwError(() => of(MeetupsActions.meetupsFailed({
			errorMessage: error.message
		}))))

	));


	createMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(MeetupsActions.createMeetup),
		exhaustMap(({ meetup }) => this.meetupsService.createMeetup(meetup)),
		map(createdMeetup => MeetupsActions.meetupCreated({ meetup: createdMeetup as Meetup })),
		catchError(error => throwError(() => of(MeetupsActions.meetupsFailed({
			errorMessage: error.message
		})))),
	));

	deleteMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(MeetupsActions.deleteMeetup),
		exhaustMap(({ id }) => this.meetupsService.deleteMeetup(id)),
		map(meetupBackend => MeetupsActions.meetupDeleted(meetupBackend)),
		catchError(error => throwError(() => of(MeetupsActions.meetupsFailed({
			errorMessage: error.message
		})))),

	));

	editMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(MeetupsActions.changeMeetup),
		exhaustMap(({ meetup, id }) =>
			this.meetupsService.changeMeetup(meetup, id).pipe(
				map(changedMeetup => MeetupsActions.meetupChanged({ meetup: changedMeetup as Meetup })),
				catchError(error => of(MeetupsActions.meetupsFailed({ errorMessage: error.message })))
			)
		)
	));






}
