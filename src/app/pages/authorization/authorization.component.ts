import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import * as AuthActions from '../../store/auth/auth.actions'

import { PrizmButtonModule, PrizmInputTextModule, PrizmInputPasswordModule  } from '@prizm-ui/components'
import { FormsModule } from '@angular/forms';
import { UserLogin } from 'src/app/models/auth.models';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/auth.models';

@Component({
    selector: 'authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        RouterLinkActive,
        RouterLink,
				PrizmButtonModule, 
				PrizmInputTextModule,
				FormsModule,
				PrizmInputPasswordModule
    ],
})
export class AuthorizationComponent {

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(
		private _store: Store<AuthState>,


	) {
		(window as any).myForm = this.myForm
		
	
		this.myForm.patchValue({
			email: 'adminadminadmin@yandex.ru',
			password: 'adminadminadmin'
		})
	

	}

	public handleSubmit(): void {
		if (this.myForm.controls.email.value === null || this.myForm.controls.password.value === null) return;

		const userLogin: UserLogin = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value
		};

		this._store.dispatch(AuthActions.login({userLogin}))
	}
}

