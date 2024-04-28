import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TUI_PASSWORD_TEXTS, tuiInputPasswordOptionsProvider, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { of, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core/components/link';
import { NgIf } from '@angular/common';
import { TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';
import * as AuthActions from '../../store/auth/auth.actions'

//prizma 
import { PrizmButtonModule, PrizmInputTextModule, PrizmInputPasswordModule  } from '@prizm-ui/components'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from 'src/app/models/auth.models';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth/auth.models';

@Component({
    selector: 'authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiInputPasswordOptionsProvider({
            icons: {
                hide: 'tuiIconEyeOffLarge',
                show: 'tuiIconEyeLarge',
            },
        }),
        {
            provide: TUI_PASSWORD_TEXTS,
            useValue: of(['']),
        },
    ],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        NgIf,
        TuiInputPasswordModule,
        TuiLinkModule,
        RouterLinkActive,
        RouterLink,
        TuiButtonModule,
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
		private _authService: AuthService, 
		private readonly _destroyRef: DestroyRef,
		private _store: Store<AuthState>

	) {
		(window as any).myForm = this.myForm
		
	
		this.myForm.patchValue({
			email: 'adminadminadmin@yandex.ru',
			password: 'adminadminadmin'
		})
		// this.myForm.patchValue({
		// 	email: 'newUser123@mail.ru',
		// 	password: 'newUser123'
		// })

	}

	public handleSubmit(): void {
		if (this.myForm.controls.email.value === null || this.myForm.controls.password.value === null) return;

		const userLogin: UserLogin = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value
		};

		// this._authService.login(userLogin).pipe(
		// 	takeUntilDestroyed(this._destroyRef),
		// 	take(1)
		// ).subscribe();
		this._store.dispatch(AuthActions.login({userLogin}))

	}
}

