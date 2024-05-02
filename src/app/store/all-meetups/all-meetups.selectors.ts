import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MeetupsState } from './all-meetups.model';
import { allMeetupsNode } from './all-meetups.reducers';


export const selectMeetupsState = createFeatureSelector<MeetupsState>(allMeetupsNode);

export const selectAllMeetups = createSelector(
	selectMeetupsState,
	(state: MeetupsState) => state.meetups
);

export const selectFilters = createSelector(
  selectMeetupsState,
  (state: MeetupsState) => state.filters
);



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


