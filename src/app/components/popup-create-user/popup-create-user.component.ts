import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Observable, tap } from 'rxjs';
import { BackendRole } from 'src/app/models/roles.models';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'popup-create-user',
  templateUrl: './popup-create-user.component.html',
  styleUrls: ['./popup-create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupCreateUserComponent  {

	public allRoles$: Observable<BackendRole[]> = this._rolesApiService.getAll().pipe(
		tap((roles: BackendRole[]) => this._setRolesToForm(roles)),
	)

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required,Validators.email]),
		password: new FormControl('', []),
		fio: new FormControl('', [Validators.required]),
		roles: new FormGroup({
		}),
	});

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, UserBackend>,
		private readonly _rolesApiService: RolesApiService,
		private readonly _userService: UsersService,
		private readonly _fb: FormBuilder,
	) {}


	public saveUser(): void {
		if (this.myForm.controls.email.value === null) return;
		if (this.myForm.controls.password.value === null) return;
		if (this.myForm.controls.fio.value === null) return;

		const roles: any = this.myForm.controls.roles.controls
		const rolesBackend: BackendRole[] = []
		for (const idAndRole in roles) {
			if (roles[idAndRole].value === true){
				rolesBackend.push(this.devideIdAndRole(idAndRole))
			}
		}
		// console.log(rolesBackend)

		const creatededUser = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value,
			fio: this.myForm.controls.fio.value,
			newRoles: rolesBackend
		}

		const subs = this._userService.createUser(creatededUser).subscribe(() => {
			subs.unsubscribe()
			this.context.completeWith()
		})

	}

	public devideIdAndRole(idAndRole: string): BackendRole {
		const resOfSeparation: RegExpMatchArray = Array.from((idAndRole.matchAll(/(\d+)(-)(.+)/gi)))[0];
		return {
			id: +resOfSeparation[1],
			name: resOfSeparation[3]
		}
	}


	private _setRolesToForm(roles: BackendRole[]): void {
		// console.log(roles)
		const rolesGroup: any = {};
		for (const role of roles) {
				rolesGroup[`${role.id}-${role.name}`] = this._fb.control(false); // You can set initial value if needed
		}

		this.myForm.setControl('roles', this._fb.group(rolesGroup));


		
	}

}
