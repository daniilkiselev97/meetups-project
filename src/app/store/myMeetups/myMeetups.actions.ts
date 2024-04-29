import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';

export const loadMyMeetups = createAction('[MyMeetups] Get MyMeetups');

export const myMeetupsLoaded = createAction('[MyMeetups] Get My Meetups Success', props<{ meetups: Meetup[] }>());

export const myMeetupsFailed = createAction('[MyMeetups] Get My Meetups Failure', props<{ errorMessage: string }>());



export const createMyMeetup = createAction('[MyMeetups] Create My Meetup', props<{ meetup: MeetupCreated }>());

export const myMeetupCreated = createAction('[MyMeetups] My Meetup Created', props<{ meetup: Meetup }>());

export const myMeetupFailed = createAction('[MyMeetups] My Meetup Failed And Not Created', props<{ errorMessage: string }>());



export const deleteMyMeetup = createAction('[MyMeetups] Delete My Meetup', props<{ id: number }>());

export const myMeetupDeleted = createAction('[MyMeetups] My Meetup Deleted', props<{ id: number }>());

export const myMeetupFailedinDeletion = createAction('[MyMeetups] My Meetup Failed And Not Deleted', props<{ errorMessage: string }>());


export const changeMyMeetup = createAction('[MyMeetups] Change My Meetup', props<{ meetup: MeetupBackend, id: number }>());

export const myMeetupChanged = createAction('[MyMeetups] My Meetup Changed', props<{ meetup: Meetup }>());

export const myMeetupFailedInChanging = createAction('[MyMeetups] My Meetup Failed And Not Changed', props<{ errorMessage: string }>());

export const setFilters = createAction('[MyMeetups] Set Filters', props<{ meetupName: string | null, ownerFio: string | null }>());


