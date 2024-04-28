import { createReducer, on } from '@ngrx/store';
import * as MeetupsActions from './meetups.actions';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MeetupsState } from './meetups.model';

export const meetupsNode = 'meetups';


export const initialState: MeetupsState = {
  meetups: []
};

export const meetupsReducer = createReducer(
  initialState,
  on(MeetupsActions.meetupsLoaded, (state: MeetupsState, { meetups }) => (
		{ 
			...state, 
			meetups: meetups 
		}
	)),

  on(MeetupsActions.meetupCreated, (state: MeetupsState, { meetup }) => (
		{ 
			...state, 
			meetups: [...state.meetups, meetup] 
		}
	)),

  on(MeetupsActions.meetupDeleted, (state: MeetupsState, { id }) => (
		{ 
			...state, 
			meetups: state.meetups.filter(meetup => meetup.id !== id) 
		}
		)),

	on(MeetupsActions.meetupChanged, (state: MeetupsState, { meetup } ) => 
		({
			...state,
			meetups: state.meetups.map((existingMeetup) => existingMeetup.id === meetup.id ? meetup : existingMeetup)
		}))

		
	)


export { MeetupsState };

