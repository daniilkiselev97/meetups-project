import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { CardMeetupComponent } from '../../components/card-meetup/card-meetup.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

import { PrizmInputTextModule } from '@prizm-ui/components';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

import * as MeetupsActions from '../../store/all-meetups/all-meetups.actions';
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

	constructor(private readonly _store: Store<MeetupsState>){}

	ngOnInit(): void {
		this._store.dispatch(MeetupsActions.loadMeetups());
		this.allMeetups$ = this._store.select(selectAllMeetupsWithFilters);

	}

	applyFilters(): void {
		const meetupName = this.meetupNameFilter.value;
    const ownerFio = this.ownerFioFilter.value;
    this._store.dispatch(MeetupsActions.setFilters({ meetupName, ownerFio }));
  }

}


