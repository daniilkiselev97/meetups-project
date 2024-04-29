import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MeetupsActions from './all-meetups.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
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

		registerMeetup$ = createEffect(() => this.actions$.pipe(
    ofType(MeetupsActions.registerUserForMeetup),
		exhaustMap(({user, meetup}) => this.meetupsService.registerUserFromMeetup(user,meetup)),
		map((registeredMeetup) => MeetupsActions.userForMeetupRegistered({meetup: registeredMeetup as Meetup})),
		catchError(error => throwError(() => of(MeetupsActions.userForMeetupFailed({
			errorMessage: error.message
		}))))
  ));

		removeMeetup$ = createEffect(() => this.actions$.pipe(
		ofType(MeetupsActions.removeUserFromMeetup),
		exhaustMap(({ user, meetup }) => this.meetupsService.removeUserFromMeetup(user, meetup)),
		map((deletedMeetup) => MeetupsActions.userFromMeetupRemoved({meetup: deletedMeetup as Meetup})),
		catchError(error => throwError(() => of(MeetupsActions.userFromMeetupRemovedFailed({
			errorMessage: error.message
		}))))

	));


	// createMeetup$ = createEffect(() => this.actions$.pipe(
	// 	ofType(MeetupsActions.createMeetup),
	// 	exhaustMap(({ meetup }) => this.meetupsService.createMeetup(meetup)),
	// 	map(createdMeetup => MeetupsActions.meetupCreated({ meetup: createdMeetup })),
	// 	catchError(error => throwError(() => of(MeetupsActions.meetupsFailed({
	// 		errorMessage: error.message
	// 	})))),
	// ));

	// deleteMeetup$ = createEffect(() => this.actions$.pipe(
	// 	ofType(MeetupsActions.deleteMeetup),
	// 	exhaustMap(({ id }) => this.meetupsService.deleteMeetup(id)),
	// 	map(meetupBackend => MeetupsActions.meetupDeleted(meetupBackend)),
	// 	catchError(error => throwError(() => of(MeetupsActions.meetupsFailed({
	// 		errorMessage: error.message
	// 	})))),

	// ));

	// editMeetup$ = createEffect(() => this.actions$.pipe(
	// 	ofType(MeetupsActions.changeMeetup),
	// 	exhaustMap(({ meetup, id }) =>
	// 		this.meetupsService.changeMeetup(meetup, id).pipe(
	// 			map(changedMeetup => MeetupsActions.meetupChanged({ meetup: changedMeetup })),
	// 			catchError(error => of(MeetupsActions.meetupsFailed({ errorMessage: error.message })))
	// 		)
	// 	)
	// ));






}
