import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Observable, tap } from 'rxjs';
import { BackendRole } from 'src/app/models/roles.models';
import { UserAuthBackend, UserBackend, UserBackendRole } from 'src/app/models/user.models';
import { RolesApiService } from 'src/app/services/roles-api.service';


@Component({
	selector: 'popup-edit-user',
	templateUrl: './popup-edit-user.component.html',
	styleUrls: ['./popup-edit-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

	//{[id]: role}
})
export class PopupEditDataUserComponent implements OnInit {

	public user: UserBackend = this.context.data;

	public allRoles$: Observable<BackendRole[]> = this._rolesApiService.getAll().pipe(
		tap(roles => this._setRolesToForm(roles)),
	)

	// public myForm: any = null;

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.email]),
		password: new FormControl('', []),
		role: new FormControl(''),
		fio: new FormControl('', []),
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
		private readonly _fb: FormBuilder,

	) {

	}

	ngOnInit(): void { //при старте компонента
		this._setUserToForm(this.user);
	}



	// public roles = [{ name: 'USER' }, { name: 'ADMIN' }];



	//this.user.roles[0].name === 'USER' ? this.roles[0] : this.roles[1]
	public EditUserData() {

	}

	private _setUserToForm(user: UserBackend): void {
		this.myForm.patchValue({
			email: user.email,
			fio: user.fio,
		});

	}

	private _setRolesToForm(roles: BackendRole[]): void {
		const rolesGroup: any = {};
		for (const role of roles) {
			const doesUserRole = this.user.roles.findIndex(userRole => userRole.id === role.id) !== -1;
			// if (doesUserRole === true) {
				rolesGroup[`${role.id}-${role.name}`] = this._fb.control(doesUserRole); // You can set initial value if needed

			// }
			
		}

		this.myForm.setControl('roles', this._fb.group(rolesGroup));
		console.log(this.myForm)

	}



	// ngOnInit(): void {
	//   this.myForm = this._fb.group({
	//     email: new FormControl('', [Validators.required]),
	//     password: new FormControl('', [Validators.required]),
	//     role: new FormControl(''),
	//     roles: this._fb.group({})
	//   });

	//   this.allRoles$.pipe(
	//     tap(roles => {
	//       const rolesGroup = {};
	//       roles.forEach(role => {
	//         rolesGroup[role.id] = this._fb.control(false); // You can set initial value if needed
	//       });
	//       this.myForm.setControl('roles', this._fb.group(rolesGroup));
	//     })
	//   ).subscribe();
	// }



}
