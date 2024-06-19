import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MeetupsState } from './all-meetups.model';
import { allMeetupsNode } from './all-meetups.reducers';
import { selectAllUsers } from '../users/users.selectors';

//Базовые селекторы
export const selectMeetupsState = createFeatureSelector<MeetupsState>(allMeetupsNode);

export const selectAllMeetups = createSelector(
	selectMeetupsState,
	(state: MeetupsState) => state.meetups
);

export const selectFilters = createSelector(
  selectMeetupsState,
  (state: MeetupsState) => state.filters
);
//Базовые селекторы

//Составные селекторы
export const selectAllMeetupsWithFilters = createSelector(
	selectAllMeetups,
	selectFilters,
	(meetups, filters) => {
		const filteredMeetups = meetups.filter(meetup => {
      if (filters.meetupName && !meetup.name.toLowerCase().replace(/\s/g, '').includes(filters.meetupName.toLowerCase().replace(/\s/g, ''))) {
        return false;
      }
			
      if (filters.ownerFio && !meetup.owner.fio.toLowerCase().replace(/\s/g, '').includes(filters.ownerFio.toLowerCase().replace(/\s/g, ''))) {
        return false;
      }

      return true;
    });

    return filteredMeetups;
  } 
)

export const selectMeetupsWithOwnerDetails = createSelector(
  selectAllMeetups,
  selectAllUsers,
  (meetups, users) => {
    return meetups.map(meetup => ({
      ...meetup,
      ownerDetails: users.find(user => user.id === meetup.owner.id)
    }));
  }
);
//Составные селекторы


