import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
	selector: 'all-meetups',
	templateUrl: './all-meetups.component.html',
	styleUrls: ['./all-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AllMeetupsComponent {
	private _stateFilter = new BehaviorSubject({
		meetupName: '',
		ownerFio: ''
	});

	public allMeetups$: Observable<Meetup[]> = this._meetupsService.allMeetups$.pipe(
		switchMap((meetups) => combineLatest([
			of(meetups),
			this._stateFilter
		])),
		map(([meetups, stateFilter]) => {
			const filterMeetupName = this._removeExtraSpaces(stateFilter.meetupName).toLowerCase();
			const filterMeetupOwnerFio = this._removeExtraSpaces(stateFilter.ownerFio).toLowerCase();
			return meetups.filter(meetup => {
				if (
					stateFilter.meetupName === '' &&
					stateFilter.ownerFio === ''

				) return true;

				const meetupName = this._removeExtraSpaces(meetup.name).toLowerCase();
				const meetupOwnerFio = this._removeExtraSpaces(meetup.owner.fio).toLowerCase();

				if (meetupName.includes(filterMeetupName) === false) return false;
				if (meetupOwnerFio.includes(filterMeetupOwnerFio) === false) return false;

				return true;
			})
		}),
	)

	constructor(
		private readonly _meetupsService: MeetupsService
	) {

	}

	public onInputOwnerFioChange(event: any): void {
		const targetNode = event.target;
		if (targetNode === null) return;
		const inputFio = targetNode.value;

		this._stateFilter.next({
			...this._stateFilter.value, 
			ownerFio: inputFio
		})
	}

	public onInputMeetupNameChange(event: any): void {
		const targetNode = event.target;
		if (targetNode === null) return;

		this._stateFilter.next({
			...this._stateFilter.value, 
			meetupName: targetNode.value
		})
	}

	private _removeExtraSpaces(str: string): string {
		// Заменяем последовательности пробелов на одиночные пробелы
		return str.replace(/\s+/g, ' ').trim();
	}


}
