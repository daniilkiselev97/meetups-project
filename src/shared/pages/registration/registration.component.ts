import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import * as Actions from '../../../app/store/auth/auth.actions'


//prizma
import { PrizmInputTextModule, PrizmInputPasswordModule, PrizmButtonModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/auth.models';


@Component({
	selector: 'registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, NgIf, RouterLinkActive, RouterLink, ReactiveFormsModule,
		FormsModule,
		PrizmInputTextModule, PrizmInputPasswordModule, PrizmButtonModule]
})
export class RegistrationComponent {

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
		surname: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),

	});

	constructor(
		private _authService: AuthService,
		private readonly _destroyRef: DestroyRef,
		private _store: Store<AuthState>

	) {

	}

	public handleSubmit(): void {
		const userSignup = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value,
			fio: `${this.myForm.controls.surname.value} ${this.myForm.controls.name.value}`
		};
		this._store.dispatch(Actions.signup({ userSignup }));

	}

}
