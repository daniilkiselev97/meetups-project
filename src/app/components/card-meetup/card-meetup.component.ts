import { ChangeDetectionStrategy, Component, Input, Inject, Injector, DestroyRef, ChangeDetectorRef, } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';
import { MeetupsService } from 'src/app/services/meetups.service';

import {  TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { PopupEditMeetupComponent } from 'src/app/components/popup-edit-meetup/popup-edit-meetup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { finalize, of, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardDatePipe } from '../../pipes/card-date.pipe';
import { NgIf } from '@angular/common';

//prizma

import {
  PRIZM_ICONS_SVG_SET,
  prizmIconSvgDateTimeCalendarPlus,
  PrizmIconSvgEnum,
  prizmIconSvgProductionIndustrySnakeCup,
  prizmIconSvgSettingsToolsBan,
  PrizmIconsSvgRegistry,
	prizmIconSvgUserAccountUser,
} from '@prizm-ui/icons';
import { PrizmButtonComponent, PrizmButtonModule, PrizmDataListModule, PrizmDropdownHostModule, PrizmConfirmDialogModule, PolymorphComponent } from '@prizm-ui/components';
import { CommonModule } from '@angular/common';
import { PolymorphModule } from '@prizm-ui/components'
import { PrizmIconsSvgModule } from '@prizm-ui/icons';
import { PrizmConfirmDialogService, PrizmOverlayInsidePlacement, PrizmDialogService } from '@prizm-ui/components';
import { PrizmDestroyService } from '@prizm-ui/helpers';
import { TemplateRef, ViewChild } from '@angular/core';

//prizma



@Component({
	selector: 'card-meetup',
	templateUrl: './card-meetup.component.html',
	styleUrls: ['./card-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [TuiButtonModule, NgIf, TuiExpandModule, CardDatePipe, PrizmButtonComponent, CommonModule, PrizmButtonModule, PrizmDropdownHostModule, PrizmDataListModule, PrizmConfirmDialogModule, PolymorphModule, PrizmIconsSvgModule],
	providers: [PrizmDestroyService]
})
export class CardMeetupComponent {
	readonly PrizmIconSvgEnum = PrizmIconSvgEnum;

	@ViewChild('footerTemp', { read: TemplateRef }) footerTemp!: TemplateRef<any>;
	@Input({ required: true }) public meetup!: Meetup;
	@Input() public isMyMeetup: boolean = false;

	public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
	public position: PrizmOverlayInsidePlacement = PrizmOverlayInsidePlacement.CENTER;
	public backdrop = true;

	private _chevronDown: string = 'chevrons-dropdown';
	private _chevronUp: string = 'chevrons-dropup';

	public userIcon: string = 'tuiIconUserLarge';

	public open: boolean = false;
	public dialog: any;

	constructor(
		@Inject(Injector) private readonly _injector: Injector,
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,

		private readonly _meetupsService: MeetupsService,
		private readonly _destroyRef: DestroyRef,
		public readonly cdRef: ChangeDetectorRef,

		private readonly confirmDialogService: PrizmConfirmDialogService,
		private readonly destroy$: PrizmDestroyService,
		private readonly iconRegistry: PrizmIconsSvgRegistry
	) {
		this.iconRegistry.registerIcons([
      prizmIconSvgUserAccountUser
    ]);
	 }

	public openDeletePopup(meetup: Meetup): void {
		this.dialog = this.confirmDialogService.open(
			new PolymorphComponent(PopupDeleteComponent, this._injector),
			{
				footer: this.footerTemp,
				data: { message: 'Вы действительно хотите удалить митап ?' }
			},
		)
		this.dialog.pipe(
		takeUntilDestroyed(this._destroyRef),
		switchMap(result => {
      if (result) {
        return this._meetupsService.deleteMeetup(meetup.id).pipe(
          finalize(() => {
            // Закрываем модальное окно после выполнения операции удаления
            this.dialog.complete();
          })
        );
      } else {
        return of(null); // Возвращаем Observable, чтобы цепочка не была оборвана
      }
    })
  ).subscribe(
    () => {
      // Успешно выполнено
    },
		(error: any) => {
      console.error('Ошибка при удалении митапа:', error);
    }
	)
	}

	public openEditPopup(meetup: Meetup): void {
		console.log(meetup)
		this.dialogService.open(
			new PolymorphComponent(PopupEditMeetupComponent, this._injector),
			{
				data: meetup, 
				size: 'l'
			},
		).subscribe()
	}
		
	

	public getChevron(): string {
		return this.open ? this._chevronUp : this._chevronDown;
	}

	public clickToggleExpanded(): void {
		this.open = !this.open;
	}


	public registerUserForMeetup(user: User | null, meetup: Meetup): void {
		if (user === null) return;

		this._meetupsService.registerUserFromMeetup(user, meetup).pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();
	}

	public removeUserFromMeetup(user: User | null, meetup: Meetup): void {
		if (user === null) return;

		this._meetupsService.removeUserFromMeetup(user, meetup).pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();
	}


}

