import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TUI_PASSWORD_TEXTS, tuiInputPasswordOptionsProvider, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core/components/link';
import { NgIf } from '@angular/common';
import { TuiPrimitiveTextfieldModule, TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
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
    imports: [ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, NgIf, TuiInputPasswordModule, TuiLinkModule, RouterLinkActive, RouterLink, TuiButtonModule]
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
	) {
	
	}

	public handleSubmit(): void {
		
		const userLogin = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value,
			fio: `${this.myForm.controls.surname.value} ${this.myForm.controls.name.value}`
		};

		this._authService.signup(userLogin).pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe(() => {
		});
	}

}
