import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as myMeetupsActions from './myMeetups.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MeetupsService } from 'src/shared/services/meetups.service';
import { Meetup } from 'src/shared/models/meetup.models';


@Injectable()
export class MyMeetupsEffects {
	constructor(
		private actions$: Actions,
		private meetupsService: MeetupsService
	) { }


	loadMyMeetups$ = createEffect(() => this.actions$.pipe(
		ofType(myMeetupsActions.loadMyMeetups),
		exhaustMap(() => this.meetupsService.getAllMy()),
		map((meetups) => myMeetupsActions.myMeetupsLoaded({ meetups })),
		catchError(error => throwError(() => of(myMeetupsActions.myMeetupsFailed({
			errorMessage: error.message
		}))))
	));

	createMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(myMeetupsActions.createMyMeetup),
		exhaustMap(({ meetup }) => this.meetupsService.createMeetup(meetup)),
		map(createdMeetup => myMeetupsActions.myMeetupCreated({ meetup: createdMeetup as Meetup })),
		catchError(error => throwError(() => of(myMeetupsActions.myMeetupFailed({
			errorMessage: error.message
		})))),
	));

	deleteMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(myMeetupsActions.deleteMyMeetup),
		exhaustMap(({ id }) => this.meetupsService.deleteMeetup(id)),
		map(meetupBackend => myMeetupsActions.myMeetupDeleted(meetupBackend)),
		catchError(error => throwError(() => of(myMeetupsActions.myMeetupFailedinDeletion({
			errorMessage: error.message
		})))),

	));

	editMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(myMeetupsActions.changeMyMeetup),
		exhaustMap(({ meetup, id }) =>
			this.meetupsService.changeMeetup(meetup, id).pipe(
				map(changedMeetup => myMeetupsActions.myMeetupChanged({ meetup: changedMeetup as Meetup })),
				catchError(error => of(myMeetupsActions.myMeetupFailedInChanging({ errorMessage: error.message })))
			)
		)
	));













}
