import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupBackendUser, User } from 'src/app/models/user.models';
import { MeetupsService } from 'src/app/services/meetups.service';

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
		private readonly _meetupsService: MeetupsService
	) {

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
