import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-popup-delete-user',
  templateUrl: './popup-delete-user.component.html',
  styleUrls: ['./popup-delete-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDeleteUserComponent {
	public user: UserBackend = this.context.data;


	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, UserBackend>,
		private readonly _usersService: UsersService
	) {

	}

	public SubmitDelete() {
		const subs = this._usersService.deleteUser(this.user).subscribe(() => {
			subs.unsubscribe();
			this.context.completeWith()
		})
	}

	public CancelDelete() {
		this.context.completeWith()
	}

}
