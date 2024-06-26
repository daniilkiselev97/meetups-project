import { Component, DestroyRef, Inject } from '@angular/core';
import { UsersService } from 'src/shared/services/users.service';
import { UserBackend } from 'src/shared/models/user.models';
import { Observable, take } from 'rxjs';
import { PopupCreateUserComponent } from 'src/app/components/popup-create-user/popup-create-user.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardUserComponent } from '../../../app/components/card-user/card-user.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PolymorphComponent, PrizmButtonModule, PrizmDialogService } from '@prizm-ui/components';
import { Store, select } from '@ngrx/store';
import { UsersState } from 'src/app/store/users/users.model';
import * as UsersActions from '../../../app/store/users/users.actions'
import { selectAllUsers } from 'src/app/store/users/users.selectors';

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
	standalone: true,
	imports: [NgIf, NgFor, CardUserComponent, AsyncPipe, PrizmButtonModule]
})
export class UsersComponent {
	public users$: Observable<UserBackend[]> = this._store.pipe(select(selectAllUsers));

	constructor(
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		private _userService: UsersService,
		private readonly _destroyRef: DestroyRef,
		private readonly _store: Store<UsersState>
	) {
		this._store.dispatch(UsersActions.loadUsers())
	}

	popupCreateUser(): void {
		const dialog = this.dialogService.open(
			new PolymorphComponent(PopupCreateUserComponent),
			{
				size: 'l',
				width: 1000
			},
		)
		dialog.pipe(
			take(1),
			takeUntilDestroyed(this._destroyRef),
		).subscribe();
	}

}
