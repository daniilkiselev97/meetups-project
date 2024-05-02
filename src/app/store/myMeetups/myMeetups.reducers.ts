import { createReducer, on } from '@ngrx/store';
import * as MymetupsActions from './myMeetups.actions';
import { Meetup, MeetupBackend } from 'src/shared/models/meetup.models';
import { MyMeetupsState } from './myMeetups.model';

export const myMeetupsNode = 'myMeetups';


export const initialState: MyMeetupsState = {
	myMeetups: [],
	filters: { meetupName: '', ownerFio: '' }
};

export const myMeetupsReducer = createReducer(
	initialState,
	on(MymetupsActions.myMeetupsLoaded, (state: MyMeetupsState, { meetups }) => (
		{
			...state,
			myMeetups: meetups
		}
	)),
	on(MymetupsActions.setFilters, (state: MyMeetupsState, { meetupName, ownerFio }) => ({
		...state,
		filters: { meetupName, ownerFio },

	})),

	on(MymetupsActions.myMeetupCreated, (state: MyMeetupsState, { meetup }) => (
		{
			...state,
			myMeetups: [...state.myMeetups, meetup]
		}
	)),

	on(MymetupsActions.myMeetupDeleted, (state: MyMeetupsState, { id }) => (
		{
			...state,
			myMeetups: state.myMeetups.filter(meetup => meetup.id !== id)
		}
	)),

	on(MymetupsActions.myMeetupChanged, (state: MyMeetupsState, { meetup }) =>
	({
		...state,
		myMeetups: state.myMeetups.map((existingMeetup) => existingMeetup.id === meetup.id ? meetup : existingMeetup)
	}))









)


