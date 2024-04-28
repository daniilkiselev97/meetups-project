import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { CardMeetupComponent } from '../../components/card-meetup/card-meetup.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

import { NgModule } from '@angular/core';
import { PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import * as MeetupsActions from '../../store/allMeetups/meetups.actions';
import { Store } from '@ngrx/store';
import { MeetupsState } from 'src/app/store/allMeetups/meetups.reducers';



@Component({
	selector: 'all-meetups',
	templateUrl: './all-meetups.component.html',
	styleUrls: ['./all-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgIf, NgFor, CardMeetupComponent, AsyncPipe, ReactiveFormsModule, FormsModule, PrizmInputTextModule,]
})
export class AllMeetupsComponent {
	private _stateFilter = new BehaviorSubject({
		meetupName: '',
		ownerFio: ''
	});

	//было - переменная this._meetupsService.allMeetups$, которая создавалась при старте приложения и отдавала сохраненное состояние
	//стало - 1 функция getAll - каждый раз создает новый поток allMeetups$ 
	//стало - 2 нет теперь subscribe внутри сервиса

	public allMeetups$: Observable<Meetup[]> = combineLatest([ //он принимает на вход массив потоков и их отслеживает
		// this._meetupsService.getAll(),
		this._store.dispatch(MeetupsActions.loadMeetups()),

		this._stateFilter
	]).pipe(
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
		private readonly _meetupsService: MeetupsService,
		private _store: Store<MeetupsState>

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


