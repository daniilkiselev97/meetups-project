import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';

export const loadMyMeetups = createAction('[MyMeetups] Load MyMeetups');

export const myMeetupsLoaded = createAction('[MyMeetups] MyMeetups Loaded', props<{ meetups: Meetup[] }>());

export const myMeetupsFailed = createAction('[MyMeetups] Load MyMeetups Failed', props<{ errorMessage: string }>());

export const registerUserForMeetup = createAction('[MyMeetups] Register User For Meetup', props<{ user: User, meetup: Meetup }>());


export const userForMeetupRegistered = createAction('[MyMeetups] User For Meetup Registered', props<{ meetup: Meetup }>());


export const removeUserFromMeetup = createAction('[MyMeetups] Remove User From Meetup', props<{ user: User, meetup: Meetup }>());

export const userFromMeetupRemoved = createAction('[MyMeetups] User From Meetup Removed', props<{ meetup: Meetup }>());


