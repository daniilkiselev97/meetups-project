import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { Meetup } from 'src/shared/models/meetup.models';
import { CardMeetupComponent } from '../../../app/components/card-meetup/card-meetup.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

import { PrizmInputTextModule } from '@prizm-ui/components';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

import * as MeetupsActions from '../../../app/store/all-meetups/all-meetups.actions';
import { Store } from '@ngrx/store';
import { MeetupsState } from 'src/app/store/all-meetups/all-meetups.model';
import { selectAllMeetupsWithFilters } from 'src/app/store/all-meetups/all-meetups.selectors';



@Component({
	selector: 'all-meetups',
	templateUrl: './all-meetups.component.html',
	styleUrls: ['./all-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgIf, NgFor, CardMeetupComponent, AsyncPipe, ReactiveFormsModule, FormsModule, PrizmInputTextModule,]
})


export class AllMeetupsComponent implements OnInit {
	meetupNameFilter = new FormControl('');
	ownerFioFilter = new FormControl('');
	allMeetups$: Observable<Meetup[]> = new Observable<Meetup[]>();

	constructor(private readonly _store: Store<MeetupsState>) {
	}

	ngOnInit(): void {
		this._store.dispatch(MeetupsActions.loadMeetups());
		this.allMeetups$ = combineLatest([
			this.meetupNameFilter.valueChanges.pipe(startWith(''), debounceTime(500), distinctUntilChanged()),
			this.ownerFioFilter.valueChanges.pipe(startWith(''), debounceTime(500), distinctUntilChanged())
		])
			.pipe(
				switchMap(([meetupName, ownerFio]) => {
					this.applyFilters(meetupName, ownerFio);
					return this._store.select(selectAllMeetupsWithFilters, { meetupName, ownerFio });
				})
			);
	}

	applyFilters(meetupName: string | null, ownerFio: string | null): void {
		this._store.dispatch(MeetupsActions.setFilters({ meetupName, ownerFio }));
	}
}








