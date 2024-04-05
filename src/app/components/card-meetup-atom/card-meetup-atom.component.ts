import { ChangeDetectionStrategy, Component, Input, Inject, Injector } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';
import { MeetupsService } from 'src/app/services/meetups.service';

import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { PopupEditMeetupComponent } from 'src/app/components/popup-edit-meetup/popup-edit-meetup.component';



@Component({
	selector: 'card-meetup-atom',
	templateUrl: './card-meetup-atom.component.html',
	styleUrls: ['./card-meetup-atom.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMeetupAtomComponent { //компонент общий для card-meetup и можно делать разные виды card-meetup
	


	@Input({ required: true }) public meetup!: Meetup; //компонент не запустится если не передается переменная
	@Input() public isMyMeetupComponent: boolean = false;


	private _chevronDown: string = 'tuiIconChevronDown';
	private _chevronUp: string = 'tuiIconChevronUp';
	public expanded: boolean = false;
	public user: string = 'tuiIconUserLarge';

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _meetupsService: MeetupsService
	) {

	}

	openEditPopup(meetup: Meetup): void {
		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupEditMeetupComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
				data: meetup
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

	public getChevron(): string {
		return this.expanded ? this._chevronUp : this._chevronDown;
	}

	public clickToggleExpanded(): void {
		this.expanded = !this.expanded;
	}


	public registerUserForMeetup(user: User | null, meetup: Meetup): void {
		if (user === null) return;

		const subs = this._meetupsService.registerUserForMeetup(user, meetup).subscribe(() => {
			subs.unsubscribe();
		});

	}

	public removeUserFromMeetup(user: User | null, meetup: Meetup): void {
		if (user === null) return;

		const subs = this._meetupsService.removeUserFromMeetup(user, meetup).subscribe(() => {
			subs.unsubscribe();
		});
	}

	public deleteMeetup(meetup: Meetup): void {
		const subs = this._meetupsService.deleteMeetup(meetup.id).subscribe(() => {
			subs.unsubscribe();
		})
	}
}
