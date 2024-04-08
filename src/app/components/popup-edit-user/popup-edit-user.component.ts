import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BackendRole } from 'src/app/models/roles.models';
import {  UserBackend } from 'src/app/models/user.models';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
	selector: 'popup-edit-user',
	templateUrl: './popup-edit-user.component.html',
	styleUrls: ['./popup-edit-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class PopupEditDataUserComponent implements OnInit {
	private _stateDefaultRoles = new BehaviorSubject<BackendRole[]>([]);

	public user: UserBackend = this.context.data;
	public allRoles$: Observable<BackendRole[]> = this._rolesApiService.getAll().pipe(
		tap(roles => this._setRolesToForm(roles)),
	);
	public myForm = new FormGroup({
		email: new FormControl('', [Validators.email]),
		password: new FormControl('', []),
		role: new FormControl(''),
		fio: new FormControl('', []),
		roles: new FormGroup({

		}),
	});

	public get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}
	

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, UserBackend>,
		private readonly _rolesApiService: RolesApiService,
		private readonly _fb: FormBuilder,
		private readonly _usersService: UsersService
	) {

	}

	ngOnInit(): void { //при старте компонента
		this._setUserToForm(this.user);
		// console.log(this.user)
	}

	public submitEditUser(): void {
		if (this.myForm.controls.email.value === null) return;
		if (this.myForm.controls.password.value === null) return;
		if (this.myForm.controls.fio.value === null) return;

		const rolesControlsInForm: any = this.myForm.controls.roles.controls;
		const rolesToSend: BackendRole[] = [];

		for (const idAndRole in rolesControlsInForm) {
			if (rolesControlsInForm[idAndRole].value === true){
				rolesToSend.push(this.devideIdAndRole(idAndRole));
			}
		}
		// console.log(rolesBackend)

		const changedUser = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value,
			fio: this.myForm.controls.fio.value,
			id: this.user.id,
			newRoles: rolesToSend
		};

		// console.log(changedUser)



		const subs = this._usersService.updateUser(changedUser).subscribe((data) => {
			// console.log(data)
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
	

	private _setUserToForm(user: UserBackend): void {
		this.myForm.patchValue({
			email: user.email,
			fio: user.fio,
		});
	}

	private _setRolesToForm(roles: BackendRole[]): void {
		// console.log(roles)
		const rolesGroup: any = {};
		for (const role of roles) {
			const doesUserRole = this.user.roles.findIndex(userRole => userRole.id === role.id) !== -1;
				rolesGroup[`${role.id}-${role.name}`] = this._fb.control(doesUserRole); 
		}

		this.myForm.setControl('roles', this._fb.group(rolesGroup));
		this._stateDefaultRoles.next(roles);
		// console.log(this.myForm)

	}



}
