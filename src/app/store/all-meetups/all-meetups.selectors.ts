import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { MeetupsState } from './all-meetups.model';
import { allMeetupsNode } from './all-meetups.reducers';


export const selectMeetupsState = createFeatureSelector<Meetup[]>(allMeetupsNode);

export const selectAllMeetups = createSelector(
	selectMeetupsState,
	(meetups: Meetup[]) => meetups
);

export const selectMeetupById = (meetupId: number) => createSelector(
	selectAllMeetups,
	(meetups: Meetup[]) => meetups.find(meetup => meetup.id === meetupId)
);

