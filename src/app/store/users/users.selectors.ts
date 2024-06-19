import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.model';
import { usersNode } from './users.reducers';
import { selectUser } from '../auth/auth.selectors';
import { selectAllMeetups } from '../all-meetups/all-meetups.selectors';

//Базовые селекторы
export const selectUsersState = createFeatureSelector<UsersState>(usersNode);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);
//Базовые селекторы


//Составные селекторы
export const selectUserMeetups = createSelector(
  selectUser,
  selectAllMeetups,
  (user, meetups) => {
    if (!user) return [];
    return meetups.filter(meetup => meetup.id === user.id);
  }
);

export const selectUserMeetupsWithDetails = createSelector(
  selectUser,
  selectAllMeetups,
  selectAllUsers,
  (user, meetups, users) => {
    if (!user) return [];
    return meetups
      .filter(meetup => meetup.id === user.id)
      .map(meetup => ({
        ...meetup,
        ownerDetails: users.find(user => user.id === meetup.id)
      }));
  }
);
//Составные селекторы
