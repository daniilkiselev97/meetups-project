import { createAction, props } from '@ngrx/store';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';

export enum MeetupActionTypes {
  LoadMeetups = '[AllMeetups] Get AllMeetups',
  MeetupsLoaded = '[AllMeetups] Get All Meetups Success',
  MeetupsFailed = '[AllMeetups] Get All Meetups Failure',
  RegisterUserForMeetup = '[AllMeetups] Register User For Meetup',
  UserForMeetupRegistered = '[AllMeetups] User For Meetup Registered',
  UserForMeetupFailed = '[AllMeetups] User For Meetup Failed',
  RemoveUserFromMeetup = '[AllMeetups] Remove User From Meetup',
  UserFromMeetupRemoved = '[AllMeetups] User From Meetup Removed',
  UserFromMeetupRemovedFailed = '[AllMeetups] User From Meetup Removed Failed',
  SetFilters = '[AllMeetups] Set Filters',
}

export const loadMeetups = createAction(MeetupActionTypes.LoadMeetups);

export const meetupsLoaded = createAction(
  MeetupActionTypes.MeetupsLoaded,
  props<{ meetups: Meetup[] }>()
);

export const meetupsFailed = createAction(
  MeetupActionTypes.MeetupsFailed,
  props<{ errorMessage: string }>()
);

export const registerUserForMeetup = createAction(
  MeetupActionTypes.RegisterUserForMeetup,
  props<{ user: User; meetup: Meetup }>()
);

export const userForMeetupRegistered = createAction(
  MeetupActionTypes.UserForMeetupRegistered,
  props<{ meetup: Meetup }>()
);

export const userForMeetupFailed = createAction(
  MeetupActionTypes.UserForMeetupFailed,
  props<{ errorMessage: string }>()
);

export const removeUserFromMeetup = createAction(
  MeetupActionTypes.RemoveUserFromMeetup,
  props<{ user: User; meetup: Meetup }>()
);

export const userFromMeetupRemoved = createAction(
  MeetupActionTypes.UserFromMeetupRemoved,
  props<{ meetup: Meetup }>()
);

export const userFromMeetupRemovedFailed = createAction(
  MeetupActionTypes.UserFromMeetupRemovedFailed,
  props<{ errorMessage: string }>()
);

export const setFilters = createAction(
  MeetupActionTypes.SetFilters,
  props<{ meetupName: string | null; ownerFio: string | null }>()
);


