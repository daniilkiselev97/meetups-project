import { ChangeDetectionStrategy, Component, Input, Inject, Injector, DestroyRef } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, take, tap } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { TuiDialogService, TuiButtonModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PopupCreateMeetupComponent } from 'src/app/components/popup-create-meetup/popup-create-meetup.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardMeetupComponent } from '../../components/card-meetup/card-meetup.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

//prizma
import { PrizmButtonModule } from '@prizm-ui/components';


@Component({
    selector: 'my-meetups',
    templateUrl: './my-meetups.component.html',
    styleUrls: ['./my-meetups.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, CardMeetupComponent, TuiButtonModule, AsyncPipe, PrizmButtonModule]
})
export class MyMeetupsComponent {
	private _stateFilter = new BehaviorSubject({
		meetupName: '',
		ownerFio: ''
	});

	//было - переменная this._meetupsService.myMeetups$, которая создавалась при старте приложения и отдавала сохраненное состояние
	//стало - 1 функция getAllMy - каждый раз создает новый поток myMeetups$ 
	//стало - 2 нет теперь subscribe внутри сервиса

	public myMeetups$: Observable<Meetup[]> = this._meetupsService.getAllMy().pipe(
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
		private readonly _meetupsService: MeetupsService,
		private readonly _destroyRef: DestroyRef,

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



	openCreatePopup(): void {
		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupCreateMeetupComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
			},
		);

		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();
	}
}
