import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';

export const loadMyMeetups = createAction('[MyMeetups] Load MyMeetups');

export const myMeetupsLoaded = createAction('[MyMeetups] MyMeetups Loaded', props<{ meetups: Meetup[] }>());

export const myMeetupsFailed = createAction('[MyMeetups] Load MyMeetups Failed', props<{ errorMessage: string }>());



export const createMeetup = createAction('[AllMeetups] Create Meetup', props<{ meetup: MeetupCreated }>());
export const meetupCreated = createAction('[AllMeetups] Meetup Created', props<{ meetup: MeetupBackend }>());

export const deleteMeetup = createAction('[AllMeetups] Delete Meetup', props<{ id: number }>());
export const meetupDeleted = createAction('[AllMeetups] Meetup Deleted', props<{ id: number }>());

export const changeMeetup = createAction('[AllMeetups] Change Meetup', props<{ meetup: MeetupBackend, id: number }>());
export const meetupChanged = createAction('[AllMeetups] Meetup Changed', props<{ meetup: MeetupBackend }>());


