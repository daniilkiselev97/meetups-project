import { createReducer, on } from '@ngrx/store';
import * as MeetupsActions from './all-meetups.actions';
import { MeetupsState } from './all-meetups.model';

export const allMeetupsNode = 'all-meetups';

export const initialState: MeetupsState = {
	meetups: []
};

export const allMeetupsReducer = createReducer(
	initialState,
	on(MeetupsActions.meetupsLoaded, (state: MeetupsState, { meetups }) => (
		{
			...state,
			meetups: meetups
		}
	)),

	// on(MeetupsActions.meetupCreated, (state: MeetupsState, { meetup }) => (
	// 	{ 
	// 		...state, 
	// 		meetups: [...state.meetups, meetup] 
	// 	}
	// )),

	// on(MeetupsActions.meetupDeleted, (state: MeetupsState, { id }) => (
	// 	{ 
	// 		...state, 
	// 		meetups: state.meetups.filter(meetup => meetup.id !== id) 
	// 	}
	// 	)),

	// on(MeetupsActions.meetupChanged, (state: MeetupsState, { meetup } ) => 
	// 	({
	// 		...state,
	// 		meetups: state.meetups.map((existingMeetup) => existingMeetup.id === meetup.id ? meetup : existingMeetup)
	// 	}))


)


