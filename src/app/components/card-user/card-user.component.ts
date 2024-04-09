import { ChangeDetectionStrategy, Component, DestroyRef, Inject, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { PopupEditDataUserComponent } from 'src/app/components/popup-edit-user/popup-edit-user.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first, switchMap, take } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgIf } from '@angular/common';




@Component({
    selector: 'card-user',
    templateUrl: './card-user.component.html',
    styleUrls: ['./card-user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, TuiInputModule, TuiSvgModule]
})
export class CardUserComponent implements OnChanges {

	@Input({ required: true }) user!: UserBackend;



	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _destroyRef: DestroyRef,
		private readonly _usersService: UsersService
	) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		this._setUserInForm(this.user);
	}


	public myForm = new FormGroup({
		email: new FormControl('', [Validators.required]),
		password: new FormControl(''),
		role: new FormControl('')
	});

	public popupEditUser(): void {

		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupEditDataUserComponent, this._injector),
			{
				data: this.user,
				dismissible: false,
				size: 'l',
			},
		)


		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1),
		).subscribe();
	}
	
	public popupDeleteUser(user: UserBackend): void {

		const dialog = this._tuiDialogService.open<{ isDelete: boolean; }>(
			new PolymorpheusComponent(PopupDeleteComponent, this._injector),
			{
				data: { message: 'Вы действительно хотите удалить пользователя ?' },
				dismissible: false,
				size: 'l',
			},
		)


		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			first(({ isDelete }) => !isDelete),
			switchMap(() => this._usersService.deleteUser(user.id)),
		).subscribe();
	}

	private _setUserInForm(user: UserBackend): void {
		// console.log(user)
		this.myForm.patchValue({
			email: user.email,
			role: user.roles[0].name
		});
	}
}
