import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush


})
export class AuthorizationComponent {

  public myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _authService: AuthService) {
		(window as any).myForm = this.myForm
		// this.myForm.patchValue({
		// 	email: 'abc@yandex.ru',
		// 	password: 'abc'
		// })
		this.myForm.patchValue({
			email: 'ADMIN@mail.ru',
			password: 'ADMIN'
		})

  }

  public handleSubmit(): void {
    if (this.myForm.controls.email.value === null || this.myForm.controls.password.value === null) return;

    const userLogin = {
      email : this.myForm.controls.email.value,
      password: this.myForm.controls.password.value
    };

    const subs = this._authService.login(userLogin).subscribe(() => {
      subs.unsubscribe();
    });
  }
}

