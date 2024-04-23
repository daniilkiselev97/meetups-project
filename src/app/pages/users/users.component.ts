import { Component, DestroyRef, Inject, Injector } from '@angular/core';
import { TuiDialogService, TuiButtonModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UsersService } from 'src/app/services/users.service';
import {  UserBackend } from 'src/app/models/user.models';
import { Observable, take } from 'rxjs';
import { PopupCreateUserComponent } from 'src/app/components/popup-create-user/popup-create-user.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

//PRIZMA
import { PrizmButtonModule } from '@prizm-ui/components';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    standalone: true,
    imports: [NgIf, TuiButtonModule, NgFor, CardUserComponent, AsyncPipe, PrizmButtonModule]
})
export class UsersComponent {
	public users$: Observable<UserBackend[]> = this._userService.getAll();

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private _userService: UsersService,
		private readonly _destroyRef: DestroyRef,
	) { }

	popupCreateUser(): void {

		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupCreateUserComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
			},
		);

		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();
	}

}
