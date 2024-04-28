import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { BackendRole } from 'src/app/models/roles.models';
import { UserBackend } from 'src/app/models/user.models';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { UsersService } from 'src/app/services/users.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { TuiInputModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';

//prizma
import { POLYMORPH_CONTEXT, PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { PrizmCheckboxComponent } from '@prizm-ui/components';
import { PrizmButtonModule } from '@prizm-ui/components'


@Component({
	selector: 'popup-edit-user',
	templateUrl: './popup-edit-user.component.html',
	styleUrls: ['./popup-edit-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, NgIf, NgFor, TuiCheckboxLabeledModule, TuiButtonModule, AsyncPipe, ReactiveFormsModule, FormsModule, PrizmInputTextModule, PrizmCheckboxComponent, PrizmButtonModule]
})
export class PopupEditDataUserComponent implements OnInit  {
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
		@Inject(POLYMORPH_CONTEXT) readonly context: any,
		private readonly _rolesApiService: RolesApiService,
		private readonly _fb: FormBuilder,
		private readonly _usersService: UsersService,
		private readonly _destroyRef: DestroyRef,
	) {

	}

	ngOnInit(): void {
		this._setUserToForm(this.user);
	}





	public submitEditUser(): void {
		const formValues = this.myForm.value as any;

		const rolesToSend: BackendRole[] = [];
		for (const idAndRole in formValues.roles) {
			if (formValues.roles[idAndRole]) {
				rolesToSend.push(this.devideIdAndRole(idAndRole));
			}
		}

		const changedUser = {
			email: formValues.email,
			password: formValues.password,
			fio: formValues.fio,
			id: this.user.id,
			newRoles: rolesToSend
		};

		this._usersService.updateUser(changedUser)
		    .pipe(
		        takeUntilDestroyed(this._destroyRef),
		        take(1)
		    )
		    .subscribe(() => {
						this._usersService._stateUpdateUsersTrigger.next(null);
		        this.context.completeWith();

		    });

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
		const rolesGroup: Record<string, FormControl<boolean | null>> = {};
		for (const role of roles) {
			const doesUserRole = this.user.roles.findIndex(userRole => userRole.id === role.id) !== -1;
			rolesGroup[`${role.id}-${role.name}`] = this._fb.control(doesUserRole);
		}

		this.myForm.setControl('roles', this._fb.group(rolesGroup));
		this._stateDefaultRoles.next(roles);

	}
}
