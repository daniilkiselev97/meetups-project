import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'popup-delete-meetup',
  templateUrl: './popup-delete-meetup.component.html',
  styleUrls: ['./popup-delete-meetup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDeleteMeetupComponent {
	public meetup: Meetup = this.context.data;


	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, Meetup>,
		private readonly _meetupsService: MeetupsService
	) {

	}

	public handleSubmitDelete() {
		const subs = this._meetupsService.deleteMeetup(this.meetup.id).subscribe(() => {
			subs.unsubscribe();
			this.context.completeWith()

		})
	}

	public handleCancelDelete() {
		this.context.completeWith()
	}
	

}
