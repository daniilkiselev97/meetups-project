import { ChangeDetectionStrategy, Component, Input, Inject, Injector, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';
import { MeetupsService } from 'src/app/services/meetups.service';

import { TuiDialogService, TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { PopupEditMeetupComponent } from 'src/app/components/popup-edit-meetup/popup-edit-meetup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { filter, first, switchMap, take, takeUntil, takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardDatePipe } from '../../pipes/card-date.pipe';
import { NgIf } from '@angular/common';

//prizma

import { NgModule } from '@angular/core';
import { PrizmButtonComponent, PrizmButtonModule,PrizmDataListModule, PrizmDropdownHostModule   } from '@prizm-ui/components';
import { CommonModule } from '@angular/common';
//prizma




@Component({
    selector: 'card-meetup',
    templateUrl: './card-meetup.component.html',
    styleUrls: ['./card-meetup.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiButtonModule, NgIf, TuiExpandModule, CardDatePipe, PrizmButtonComponent, CommonModule, PrizmButtonModule, PrizmDropdownHostModule, PrizmDataListModule]
})
export class CardMeetupComponent { 

	@Input({ required: true }) public meetup!: Meetup; 
	@Input() public isMyMeetup: boolean = false;


	// private _chevronDown: string = 'tuiIconChevronDown';
	// private _chevronUp: string = 'tuiIconChevronUp';

	private _chevronDown: string = 'chevrons-dropdown';
	private _chevronUp: string = 'chevrons-dropup';

	// public expanded: boolean = false;
	public userIcon: string = 'tuiIconUserLarge';

	public open: boolean = false;

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _meetupsService: MeetupsService,
		private readonly _destroyRef: DestroyRef,
		public readonly cdRef: ChangeDetectorRef
	) {

	}

	public openEditPopup(meetup: Meetup): void {
		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupEditMeetupComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
				data: meetup
			},
		);

		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();
	}

	public openDeletePopup(meetup: Meetup): void {
		const dialog = this._tuiDialogService.open<{ isDelete: boolean; }>(
			new PolymorpheusComponent(PopupDeleteComponent, this._injector),
			{
				dismissible: false,
				size: 'm',
				data: { message: 'Вы действительно хотите удалить митап ?' }
			},
		);

		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			first(({ isDelete }) => !isDelete),
			switchMap(() => this._meetupsService.deleteMeetup(meetup.id)),
		).subscribe();
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
