import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as myMeetupsActions from './myMeetups.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MeetupsService } from 'src/app/services/meetups.service';
import { Meetup } from 'src/app/models/meetup.models';


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












}
