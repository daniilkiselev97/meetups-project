import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';

export enum MyMeetupsActionTypes {
  LoadMyMeetups = '[MyMeetups] Get MyMeetups',
  MyMeetupsLoaded = '[MyMeetups] Get My Meetups Success',
  MyMeetupsFailed = '[MyMeetups] Get My Meetups Failure',
  CreateMyMeetup = '[MyMeetups] Create My Meetup',
  MyMeetupCreated = '[MyMeetups] My Meetup Created',
  MyMeetupFailed = '[MyMeetups] My Meetup Failed And Not Created',
  DeleteMyMeetup = '[MyMeetups] Delete My Meetup',
  MyMeetupDeleted = '[MyMeetups] My Meetup Deleted',
  MyMeetupFailedinDeletion = '[MyMeetups] My Meetup Failed And Not Deleted',
  ChangeMyMeetup = '[MyMeetups] Change My Meetup',
  MyMeetupChanged = '[MyMeetups] My Meetup Changed',
  MyMeetupFailedInChanging = '[MyMeetups] My Meetup Failed And Not Changed',
  SetFilters = '[MyMeetups] Set Filters',
}

export const loadMyMeetups = createAction(MyMeetupsActionTypes.LoadMyMeetups);
export const myMeetupsLoaded = createAction(MyMeetupsActionTypes.MyMeetupsLoaded, props<{ meetups: Meetup[] }>());
export const myMeetupsFailed = createAction(MyMeetupsActionTypes.MyMeetupsFailed, props<{ errorMessage: string }>());

export const createMyMeetup = createAction(MyMeetupsActionTypes.CreateMyMeetup, props<{ meetup: MeetupCreated }>());
export const myMeetupCreated = createAction(MyMeetupsActionTypes.MyMeetupCreated, props<{ meetup: Meetup }>());
export const myMeetupFailed = createAction(MyMeetupsActionTypes.MyMeetupFailed, props<{ errorMessage: string }>());

export const deleteMyMeetup = createAction(MyMeetupsActionTypes.DeleteMyMeetup, props<{ id: number }>());
export const myMeetupDeleted = createAction(MyMeetupsActionTypes.MyMeetupDeleted, props<{ id: number }>());
export const myMeetupFailedinDeletion = createAction(MyMeetupsActionTypes.MyMeetupFailedinDeletion, props<{ errorMessage: string }>());

export const changeMyMeetup = createAction(MyMeetupsActionTypes.ChangeMyMeetup, props<{ meetup: MeetupBackend, id: number }>());
export const myMeetupChanged = createAction(MyMeetupsActionTypes.MyMeetupChanged, props<{ meetup: Meetup }>());
export const myMeetupFailedInChanging = createAction(MyMeetupsActionTypes.MyMeetupFailedInChanging, props<{ errorMessage: string }>());

export const setFilters = createAction(MyMeetupsActionTypes.SetFilters, props<{ meetupName: string | null, ownerFio: string | null }>());



