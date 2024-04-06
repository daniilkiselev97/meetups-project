import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { UserAuthBackend } from 'src/app/models/user.models';


@Component({
	selector: 'popup-edit-user',
	templateUrl: './popup-edit-user.component.html',
	styleUrls: ['./popup-edit-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupEditDataUserComponent {

	public user: UserAuthBackend = this.context.data;

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, UserAuthBackend>,
	) {}

	public roles = [{ name: 'USER' }, { name: 'ADMIN' }];


		myForm =  new FormGroup({
			email: new FormControl(this.user.email, [Validators.required]),
			password: new FormControl(this.user.password, [Validators.required]),
			role: new FormControl(this.user.roles[0].name === 'USER' ? this.roles[0] : this.roles[1])
		});

	public EditUserData() {

		
		
	}

	

}
