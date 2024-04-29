import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';

export const loadMeetups = createAction('[AllMeetups] Get AllMeetups');

export const meetupsLoaded = createAction('[AllMeetups] Get All Meetups Success', props<{ meetups: Meetup[] }>());
export const meetupsFailed = createAction('[AllMeetups] Get All Meetups Failure', props<{ errorMessage: string }>());



export const registerUserForMeetup = createAction('[AllMeetups] Register User For Meetup', props<{ user: User, meetup: Meetup }>());

export const userForMeetupRegistered = createAction('[AllMeetups] User For Meetup Registered', props<{ meetup: Meetup }>());

export const userForMeetupFailed = createAction('[AllMeetups] User For Meetup Failed', props<{ errorMessage: string }>());




export const removeUserFromMeetup = createAction('[AllMeetups] Remove User From Meetup', props<{ user: User, meetup: Meetup }>());

export const userFromMeetupRemoved = createAction('[AllMeetups] User From Meetup Removed', props<{ meetup: Meetup }>());

export const userFromMeetupRemovedFailed = createAction('[AllMeetups] User From Meetup Removed Failed', props<{ errorMessage: string }>());



export const setFilters = createAction('[AllMeetups] Set Filters', props<{ meetupName: string | null, ownerFio: string | null }>());

