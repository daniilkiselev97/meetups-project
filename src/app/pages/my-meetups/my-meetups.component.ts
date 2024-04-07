import { ChangeDetectionStrategy, Component, Input, Inject, Injector } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PopupCreateMeetupComponent } from 'src/app/components/popup-create-meetup/popup-create-meetup.component';


@Component({
	selector: 'my-meetups',
	templateUrl: './my-meetups.component.html',
	styleUrls: ['./my-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyMeetupsComponent {
	private _stateFilter = new BehaviorSubject({
		meetupName: '',
		ownerFio: ''
	});

	public myMeetups$: Observable<Meetup[]> = this._myMeetupsService.myMeetups$.pipe(
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
		tap(console.log)
	)

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _myMeetupsService: MeetupsService
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
		
		return str.replace(/\s+/g, ' ').trim();
	}
	// public myMeetups$: Observable<Meetup[]> = this._myMeetupsService.getAllMy();



	openCreatePopup(): void {
		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupCreateMeetupComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
			},
		);

		const subs = dialog.subscribe({
			next: data => {
				console.log(`Dialog emitted data = ${data}`);
				subs.unsubscribe();
			},
			complete: () => {
				console.log('Dialog closed');
				subs.unsubscribe();
			},
		});
	}

	

}
