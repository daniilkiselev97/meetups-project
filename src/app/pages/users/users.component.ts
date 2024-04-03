import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
	constructor(private _router: Router){}

	goEditingData() {
		this._router.navigateByUrl('editing-data')
	}

}
