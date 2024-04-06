import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { UserAuthBackend } from 'src/app/models/user.models';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-popup-delete-user',
  templateUrl: './popup-delete-user.component.html',
  styleUrls: ['./popup-delete-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDeleteUserComponent {
	public user: UserAuthBackend = this.context.data;


	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, UserAuthBackend>,
		// private readonly _meetupsService: MeetupsService
	) {

	}

	public handleSubmitDelete() {
		// const subs = this._meetupsService.deleteMeetup(this.meetup.id).subscribe(() => {
		// 	subs.unsubscribe();
		// 	this.context.completeWith()

		// })
	}

	public handleCancelDelete() {
		this.context.completeWith()
	}

}
