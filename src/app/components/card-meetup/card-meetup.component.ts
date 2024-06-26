import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, } from '@angular/core';
import { Meetup } from 'src/shared/models/meetup.models';
import { User } from 'src/shared/models/user.models';
import { PopupEditMeetupComponent } from 'src/app/components/popup-edit-meetup/popup-edit-meetup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { CardDatePipe } from '../../../shared/pipes/card-date.pipe';
import { NgIf } from '@angular/common';
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
import { UtilIconsModule } from 'src/shared/utils/utils-icons/utils-icons.module';

@Component({
	selector: 'card-meetup',
	templateUrl: './card-meetup.component.html',
	styleUrls: ['./card-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgIf, CardDatePipe, PrizmButtonComponent, CommonModule, PrizmButtonModule, PrizmDropdownHostModule, PrizmDataListModule, PrizmConfirmDialogModule, PolymorphModule, UtilIconsModule, PrizmIconsSvgModule],
	providers: [PrizmDestroyService]
})
export class CardMeetupComponent {

	@ViewChild('footerTemp', { read: TemplateRef }) footerTemp!: TemplateRef<any>;
	@Input({ required: true }) public meetup!: Meetup;
	@Input() public isMyMeetup: boolean = false;

	public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
	public position: PrizmOverlayInsidePlacement = PrizmOverlayInsidePlacement.CENTER;
	public backdrop = true;

	private _chevronDown: string = 'chevrons-dropdown';
	private _chevronUp: string = 'chevrons-dropup';

	public open: boolean = false;

	constructor(
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		public readonly cdRef: ChangeDetectorRef,

		private readonly confirmDialogService: PrizmConfirmDialogService,
		private readonly _storeMyMeetups: Store<MyMeetupsState>,
	) {

	}

	public openDeletePopup(meetup: Meetup): void {
		this.confirmDialogService.open(
			new PolymorphComponent(PopupDeleteComponent),
			{
				footer: this.footerTemp,
				data: { message: 'Вы действительно хотите удалить митап ?' }
			},

		).subscribe((result) => {
			if (result) {
				this._storeMyMeetups.dispatch(MyMeetupsActions.deleteMyMeetup({ id: meetup.id }))
			}
		})

	}

	public openEditPopup(meetup: Meetup): void {
		this.dialogService.open(
			new PolymorphComponent(PopupEditMeetupComponent),
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

