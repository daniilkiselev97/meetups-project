import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_PASSWORD_TEXTS, tuiInputPasswordOptionsProvider } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
	]
})
export class RegistrationComponent {

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
		surname: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),

	});

	constructor(private _authService: AuthService) {
		// (window as any).myForm = this.myForm
		// this.myForm.patchValue({
		// 	email: 'abc@yandex.ru',
		// 	password: 'abc'
		// })
		// this.myForm.patchValue({
		// 	email: 'ADMIN@mail.ru',
		// 	password: 'ADMIN'
		// })

	}

	public handleSubmit(): void {
		if (this.myForm.controls.email.value === null || this.myForm.controls.password.value === null || this.myForm.controls.surname.value === null || this.myForm.controls.name.value === null) return;

		const userLogin = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value,
			fio: `${this.myForm.controls.surname.value} ${this.myForm.controls.name.value}`
		};

		const subs = this._authService.signup(userLogin).subscribe(() => {
			subs.unsubscribe();
		});
	}

}
