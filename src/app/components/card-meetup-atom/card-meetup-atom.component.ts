import { ChangeDetectionStrategy, Component, Input, Inject, Injector } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { User } from 'src/app/models/user.models';
import { MeetupsService } from 'src/app/services/meetups.service';

import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { EditMeetupComponent } from 'src/app/pages/edit-meetup/edit-meetup.component';



@Component({
	selector: 'card-meetup-atom',
	templateUrl: './card-meetup-atom.component.html',
	styleUrls: ['./card-meetup-atom.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMeetupAtomComponent { //компонент общий для card-meetup и можно делать разные виды card-meetup
	private readonly dialog = this.dialogs.open<number>(
		new PolymorpheusComponent(EditMeetupComponent, this.injector),
		{
			data: 237,
			dismissible: false,
			size: 'l',
		},
	);


	@Input({ required: true }) public meetup!: Meetup; //компонент не запустится если не передается переменная
	@Input() public isMyMeetupComponent: boolean = false;


	private _chevronDown: string = 'tuiIconChevronDown';
	private _chevronUp: string = 'tuiIconChevronUp';
	public expanded: boolean = false;
	public user: string = 'tuiIconUserLarge';

	constructor(
		@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		private readonly _meetupsService: MeetupsService
	) {

	}

	showDialog(): void {
		this.dialog.subscribe({
			next: data => {
				console.log(`Dialog emitted data = ${data}`);
			},
			complete: () => {
				console.log('Dialog closed');
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

}
