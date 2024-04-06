import { Component, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UsersService } from 'src/app/services/users.service';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { Observable } from 'rxjs';
import { PopupCreateUserComponent } from 'src/app/components/popup-create-user/popup-create-user.component';

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent {
	public users$: Observable<UserBackend[]> = this._userService.users$;


	
	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private _userService: UsersService,
	) { }

	popupCreateUser(): void {

		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupCreateUserComponent, this._injector),
			{
				// data: 237,
				dismissible: false,
				size: 'l',
			},
		);


		const subs = dialog.subscribe({
			next: data => {
				console.log(`Dialog emitted data = ${data}`);
				subs.unsubscribe();

			},
			complete: () => {
				console.log('Dialog closed');
				subs.unsubscribe();

			},
		});
	}







}
