import { createReducer, on } from '@ngrx/store';
import * as MymetupsActions from './myMeetups.actions';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MyMeetupsState } from './myMeetups.model';

export const meetupsNode = 'myMeetups';


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

	on(MymetupsActions.userForMeetupRegistered, (state, { meetup }) => ({
    ...state,
    myMeetups: [...state.myMeetups, meetup],
  })),

	on(MymetupsActions.userFromMeetupRemoved, (state, { meetup }) => ({
    ...state,
    myMeetups: state.myMeetups.filter(meetupInState => meetupInState.id !== meetup.id)
  }))

	


)


