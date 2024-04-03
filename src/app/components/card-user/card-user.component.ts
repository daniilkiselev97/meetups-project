import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardUserComponent {
	constructor(private _router: Router){

	}
	openEditingData() {
		this._router.navigateByUrl('editing-data')

	}

}
