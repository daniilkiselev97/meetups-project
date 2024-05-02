import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { CardMeetupComponent } from '../../components/card-meetup/card-meetup.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PolymorphComponent, PrizmButtonModule, PrizmDialogService } from '@prizm-ui/components';
import { PrizmDialogModule } from '@prizm-ui/components';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MyMeetupsState } from 'src/app/store/myMeetups/myMeetups.model';
import * as MyMeetupsActions from '../../store/myMeetups/myMeetups.actions';
import {  selectMyMeetupsWithFilters } from 'src/app/store/myMeetups/myMeetups.selectors';
import { PopupCreateMeetupComponent } from 'src/app/components/popup-create-meetup/popup-create-meetup.component';


@Component({
    selector: 'my-meetups',
    templateUrl: './my-meetups.component.html',
    styleUrls: ['./my-meetups.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, CardMeetupComponent, AsyncPipe, PrizmButtonModule, PrizmDialogModule, ReactiveFormsModule, FormsModule,]
})


export class MyMeetupsComponent implements OnInit {
	meetupNameFilter = new FormControl('');
  ownerFioFilter = new FormControl('');
	myMeetups$: Observable<Meetup[]> = new Observable<Meetup[]>();

	constructor(
		private readonly _store: Store<MyMeetupsState>,
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
	){}



	ngOnInit(): void {
		this._store.dispatch(MyMeetupsActions.loadMyMeetups());
		this.myMeetups$ = combineLatest([
			this.meetupNameFilter.valueChanges.pipe(startWith(''),debounceTime(500), distinctUntilChanged()),
			this.ownerFioFilter.valueChanges.pipe(startWith(''),debounceTime(500), distinctUntilChanged())
		])
		.pipe(
			switchMap(([meetupName, ownerFio]) => {
				this.applyFilters(meetupName, ownerFio);
				return this._store.select(selectMyMeetupsWithFilters, { meetupName, ownerFio });
			})
		);
	}
	
	applyFilters(meetupName: string | null, ownerFio: string | null): void {
		this._store.dispatch(MyMeetupsActions.setFilters({ meetupName, ownerFio }));
	}


		openCreatePopup(): void {
		this.dialogService.open(
			new PolymorphComponent(PopupCreateMeetupComponent),
			{ 
				size: 'l'
			},
		).subscribe()
	}
}
