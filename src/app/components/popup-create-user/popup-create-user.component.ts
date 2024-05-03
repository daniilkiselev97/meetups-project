import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormRecord } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { BackendRole } from 'src/shared/models/roles.models';
import { RolesApiService } from 'src/shared/services/roles-api.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { POLYMORPH_CONTEXT, PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { PrizmCheckboxComponent } from '@prizm-ui/components';
import { PrizmButtonModule } from '@prizm-ui/components'
import { Store } from '@ngrx/store';
import { UsersState } from 'src/app/store/users/users.model';
import * as UsersActions from '../../store/users/users.actions'


@Component({
	selector: 'popup-create-user',
	templateUrl: './popup-create-user.component.html',
	styleUrls: ['./popup-create-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, NgIf, NgFor, AsyncPipe, ReactiveFormsModule, FormsModule, PrizmInputTextModule, PrizmCheckboxComponent, PrizmButtonModule]
})
export class PopupCreateUserComponent {



	public allRoles$: Observable<BackendRole[]> = this._rolesApiService.getAll().pipe(
		tap((roles: BackendRole[]) => this._setRolesToForm(roles)),
	)

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', []),
		fio: new FormControl('', [Validators.required]),
		roles: new FormRecord({})
	});

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(POLYMORPH_CONTEXT) readonly context: any,
		private readonly _rolesApiService: RolesApiService,
		private readonly _fb: FormBuilder,
		private readonly _store: Store<UsersState>
	) { }


	public saveUser(): void {
		if (this.myForm.valid === false) return;
		const formValues = this.myForm.value as any;
		const rolesFormGroup = this.myForm.get('roles') as FormGroup;
		const rolesBackend: BackendRole[] = [];

		for (const roleName in rolesFormGroup.controls) {
			const roleControl = rolesFormGroup.get(roleName) as FormControl;
			if (roleControl.value === true) {
				const roleParts = roleName.split('-');
				rolesBackend.push({ id: +roleParts[0], name: roleParts[1] });
			}
		}
		const creatededUser = {
			email: formValues.email,
			password: formValues.password,
			fio: formValues.fio,
			newRoles: rolesBackend
		};

		this._store.dispatch(UsersActions.createUser({ userCreateObj: creatededUser }))
		this.context.completeWith()



	}


	private _setRolesToForm(roles: BackendRole[]): void {
		for (const role of roles) {
			this.myForm.controls['roles'].addControl(`${role.id}-${role.name}`, new FormControl(false))
		}
	}
}


