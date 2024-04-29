import { createReducer, on } from '@ngrx/store';
import * as MymetupsActions from './myMeetups.actions';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MyMeetupsState } from './myMeetups.model';

export const myMeetupsNode = 'myMeetups';


export const initialState: MyMeetupsState = {
	myMeetups: []
};

export const myMeetupsReducer = createReducer(
	initialState,
	on(MymetupsActions.myMeetupsLoaded, (state: MyMeetupsState, { meetups }) => (
		{
			...state,
			myMeetups: meetups
		}
	)),





	


)


