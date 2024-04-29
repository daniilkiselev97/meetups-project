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


}
