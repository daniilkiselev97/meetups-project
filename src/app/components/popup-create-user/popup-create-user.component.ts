import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { BackendRole } from 'src/app/models/roles.models';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { UsersService } from 'src/app/services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { TuiInputModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';

//prizma
import { POLYMORPH_CONTEXT, PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { PrizmCheckboxComponent } from '@prizm-ui/components';
import { PrizmButtonModule } from '@prizm-ui/components'


@Component({
    selector: 'popup-create-user',
    templateUrl: './popup-create-user.component.html',
    styleUrls: ['./popup-create-user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, NgIf, NgFor, TuiCheckboxLabeledModule, TuiButtonModule, AsyncPipe, ReactiveFormsModule,FormsModule,PrizmInputTextModule, PrizmCheckboxComponent, PrizmButtonModule]
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
		@Inject(POLYMORPH_CONTEXT) readonly context: any,
		private readonly _rolesApiService: RolesApiService,
		private readonly _userService: UsersService,
		private readonly _fb: FormBuilder,
		private readonly _destroyRef: DestroyRef,
		private cdr: ChangeDetectorRef
	) {}


	// public saveUser(): void {
	// 	if (this.myForm.valid === false) return;
	// 	const formValues = this.myForm.value as any;
	// 	const roles: any = formValues.roles;
	// 	const rolesBackend: BackendRole[] = []
	// 	for (const idAndRole in roles) {
	// 		if (roles[idAndRole].value === true){
	// 			rolesBackend.push(this.devideIdAndRole(idAndRole))
	// 		}
	// 	}
	// 	const creatededUser = {
	// 		email: formValues.email,
	// 		password: formValues.password,
	// 		fio: formValues.fio,
	// 		newRoles: rolesBackend
	// 	};

	// 	this._userService.createUser(creatededUser)
	// 	.pipe(
	// 		takeUntilDestroyed(this._destroyRef),
	// 		take(1)
	// 	)
	// 	.subscribe((result) => {
	// 		console.log('Результат создания пользователя:', result);
	// 		console.log('подписка')
	// 		this.context.completeWith();
	// 		// this.cdr.detectChanges()
	// });

	// }

	public saveUser(): void {
		if (this.myForm.valid === false) return;
	
		const formValues = this.myForm.value as any;
		const roles: any = formValues.roles;
		const rolesBackend: BackendRole[] = [];
	
		for (const idAndRole in roles) {
			if (roles[idAndRole].value === true) {
				rolesBackend.push(this.devideIdAndRole(idAndRole));
			}
		}
	
		const createdUser = {
			email: formValues.email,
			password: formValues.password,
			fio: formValues.fio,
			newRoles: rolesBackend,
		};
	
		this._userService.createUser(createdUser)
			.pipe(
				takeUntilDestroyed(this._destroyRef),
				take(1),
				tap((result) => {
					console.log('Результат создания пользователя:', result);
					console.log('подписка');
				})
			)
			.subscribe({
				// Обработка успеха с помощью метода Prizm UI (см. документацию)
				next: () => this.context.completeWith(/* соответствующие аргументы */),
				error: (error) => console.error('Ошибка создания пользователя:', error),
			});
	}

	public devideIdAndRole(idAndRole: string): BackendRole {
		const resOfSeparation: RegExpMatchArray = Array.from((idAndRole.matchAll(/(\d+)(-)(.+)/gi)))[0];
		return {
			id: +resOfSeparation[1],
			name: resOfSeparation[3]
		}
	}


	private _setRolesToForm(roles: BackendRole[]): void {
		const rolesGroup: Record<string, FormControl<boolean | null>> = {};

		for (const role of roles) {
			rolesGroup[`${role.id}-${role.name}`] = this._fb.control(false); // You can set initial value if needed
		}

		this.myForm.setControl('roles', this._fb.group(rolesGroup));
	}

}
