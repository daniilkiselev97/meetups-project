import { ChangeDetectionStrategy, Component, Input, Inject, Injector, ChangeDetectorRef, } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';

import { TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';

import { PopupEditMeetupComponent } from 'src/app/components/popup-edit-meetup/popup-edit-meetup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { CardDatePipe } from '../../pipes/card-date.pipe';
import { NgIf } from '@angular/common';


import {
	PrizmIconSvgEnum,
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
import { Store } from '@ngrx/store';
import * as MeetupsActions from '../../store/all-meetups/all-meetups.actions'
import * as MyMeetupsActions from '../../store/myMeetups/myMeetups.actions'
import { MyMeetupsState } from 'src/app/store/myMeetups/myMeetups.model';

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

	constructor(
		@Inject(Injector) private readonly _injector: Injector,
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		public readonly cdRef: ChangeDetectorRef,

		private readonly confirmDialogService: PrizmConfirmDialogService,
		private readonly iconRegistry: PrizmIconsSvgRegistry,
		private readonly _storeMyMeetups: Store<MyMeetupsState>,
	) {
		this.iconRegistry.registerIcons([
			prizmIconSvgUserAccountUser
		]);
	}

	public openDeletePopup(meetup: Meetup): void {
		this.confirmDialogService.open(
			new PolymorphComponent(PopupDeleteComponent, this._injector),
			{
				footer: this.footerTemp,
				data: { message: 'Вы действительно хотите удалить митап ?' }
			},
		).subscribe((result) => {
			if(result) {
				this._storeMyMeetups.dispatch(MyMeetupsActions.deleteMyMeetup({ id: meetup.id }))
			}
		})
		
	}

	public openEditPopup(meetup: Meetup): void {
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

		this._storeMyMeetups.dispatch(MeetupsActions.registerUserForMeetup({ user, meetup }))

	}

	public removeUserFromMeetup(user: User | null, meetup: Meetup): void {
		if (user === null) return;
		
		this._storeMyMeetups.dispatch(MeetupsActions.removeUserFromMeetup({ user, meetup }))
	}
}

