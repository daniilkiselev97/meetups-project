import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';

export const loadMeetups = createAction('[AllMeetups] Load AllMeetups');

export const meetupsLoaded = createAction('[AllMeetups] AllMeetups Loaded', props<{ meetups: Meetup[] }>());
export const meetupsFailed = createAction('[AllMeetups] Load AllMeetups Failed', props<{ errorMessage: string }>());

export const createMeetup = createAction('[AllMeetups] Create Meetup', props<{ meetup: MeetupCreated }>());
export const meetupCreated = createAction('[AllMeetups] Meetup Created', props<{ meetup: MeetupBackend }>());

export const deleteMeetup = createAction('[AllMeetups] Delete Meetup', props<{ id: number }>());
export const meetupDeleted = createAction('[AllMeetups] Meetup Deleted', props<{ id: number }>());

export const changeMeetup = createAction('[AllMeetups] Change Meetup', props<{ meetup: Meetup, id: number }>());
export const meetupChanged = createAction('[AllMeetups] Meetup Changed', props<{ meetup: MeetupBackend }>());
