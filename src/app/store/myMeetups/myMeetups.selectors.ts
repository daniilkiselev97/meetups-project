import { createSelector, createFeatureSelector } from '@ngrx/store';

import { MyMeetupsState } from './myMeetups.model';
import { myMeetupsNode } from './myMeetups.reducers';

//Базовые селекторы
export const selectMeetupsState = createFeatureSelector<MyMeetupsState>(myMeetupsNode);

export const selectMyMeetups = createSelector(
	selectMeetupsState,
	(state: MyMeetupsState) => state.myMeetups

);

export const selectFilters = createSelector(
  selectMeetupsState,
  (state: MyMeetupsState) => state.filters
);
//Базовые селекторы


//Составные селекторы
export const selectMyMeetupsWithFilters = createSelector(
	selectMyMeetups,
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
//Составные селекторы


