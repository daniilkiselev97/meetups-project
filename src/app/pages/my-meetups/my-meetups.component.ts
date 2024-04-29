import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { TuiButtonModule } from '@taiga-ui/core';
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
    imports: [NgIf, NgFor, CardMeetupComponent, TuiButtonModule, AsyncPipe, PrizmButtonModule, PrizmDialogModule, ReactiveFormsModule, FormsModule,]
})


export class MyMeetupsComponent implements OnInit {
	meetupNameFilter = new FormControl('');
  ownerFioFilter = new FormControl('');
	myMeetups$: Observable<Meetup[]> = new Observable<Meetup[]>();

	constructor(
		private readonly _store: Store<MyMeetupsState>,
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		@Inject(Injector) private readonly _injector: Injector,
	){}

	ngOnInit(): void {
		this._store.dispatch(MyMeetupsActions.loadMyMeetups());
		this.myMeetups$ = this._store.select(selectMyMeetupsWithFilters);

	}

	applyFilters(): void {
		const meetupName = this.meetupNameFilter.value;
    const ownerFio = this.ownerFioFilter.value;
    this._store.dispatch(MyMeetupsActions.setFilters({ meetupName, ownerFio }));
  }

		openCreatePopup(): void {
		this.dialogService.open(
			new PolymorphComponent(PopupCreateMeetupComponent, this._injector),
			{ 
				size: 'l'
			},
		).subscribe()
	}
}
