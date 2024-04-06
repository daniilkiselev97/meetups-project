import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { UserAuthBackend } from 'src/app/models/user.models';

@Component({
  selector: 'popup-create-user',
  templateUrl: './popup-create-user.component.html',
  styleUrls: ['./popup-create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupCreateUserComponent {

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
	) {}

	public roles = [{ name: 'user' }, { name: 'admin' }];


	 myForm = new FormGroup({
		login: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			role: new FormControl(this.roles[0])
	})

		

	public createUser() {
		alert('created!')
	}
}
