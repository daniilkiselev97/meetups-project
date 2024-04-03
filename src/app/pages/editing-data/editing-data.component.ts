import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
	selector: 'editing-data',
	templateUrl: './editing-data.component.html',
	styleUrls: ['./editing-data.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditingDataComponent {

	constructor(private _router: Router) {}

	items = [{ name: 'user' }, { name: 'admin' }];

	readonly myForm = new FormGroup({
		login: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		role: new FormControl(this.items[0])
	});

	goUsers() {
		//Send data to service
		this._router.navigateByUrl('users')

	}

}
