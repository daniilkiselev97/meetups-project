import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TUI_PASSWORD_TEXTS, tuiInputPasswordOptionsProvider } from '@taiga-ui/kit';
import { of } from 'rxjs';

@Component({
	selector: 'authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.css'],
	// changeDetection: ChangeDetectionStrategy.OnPush
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


})
export class AuthorizationComponent {

	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private _authService: AuthService) {
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

		const userLogin = {
			email: this.myForm.controls.email.value,
			password: this.myForm.controls.password.value
		};

		const subs = this._authService.login(userLogin).subscribe(() => {
			subs.unsubscribe();
		});
	}
}

