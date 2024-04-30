import { ChangeDetectionStrategy, Component, DestroyRef, Inject, Injector, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { UserBackend } from 'src/app/models/user.models';
import { PopupEditDataUserComponent } from 'src/app/components/popup-edit-user/popup-edit-user.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgIf } from '@angular/common';


import { PolymorphComponent, PrizmConfirmDialogService, PrizmDialogService, PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import { PrizmIconsSvgModule, prizmIconSvgEditorDecorBroom, prizmIconSvgSettingsToolsDeleteContent } from '@prizm-ui/icons';
import {
	PrizmIconSvgEnum,
	PrizmIconsSvgRegistry,
} from '@prizm-ui/icons';
import { PrizmButtonModule } from '@prizm-ui/components';
import { Store } from '@ngrx/store';
import { UsersState } from 'src/app/store/users/users.model';
import * as UsersActions from '../../store/users/users.actions'




@Component({
	selector: 'card-user',
	templateUrl: './card-user.component.html',
	styleUrls: ['./card-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgIf, ReactiveFormsModule, TuiInputModule, TuiSvgModule, ReactiveFormsModule,
		FormsModule,
		PrizmInputTextModule, PrizmIconsSvgModule, PrizmButtonModule]
})
export class CardUserComponent implements OnChanges {
	@ViewChild('footerTemp', { read: TemplateRef }) footerTemp!: TemplateRef<any>;
	@Input({ required: true }) user!: UserBackend;
	readonly PrizmIconSvgEnum = PrizmIconSvgEnum;
	// dialog: any;

	constructor(
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _destroyRef: DestroyRef,
		private readonly iconRegistry: PrizmIconsSvgRegistry,
		private readonly confirmDialogService: PrizmConfirmDialogService,
		private readonly _store: Store<UsersState>
	) {
		this.iconRegistry.registerIcons([
			prizmIconSvgEditorDecorBroom,
			prizmIconSvgSettingsToolsDeleteContent

		]);
	}

	ngOnChanges(changes: SimpleChanges): void {
		this._setUserInForm(this.user);
	}


	public myForm = new FormGroup({
		email: new UntypedFormControl({ value: '', disabled: true }),
		password: new UntypedFormControl({ value: '', disabled: true }),
		role: new UntypedFormControl({ value: '', disabled: true })
	});

	public popupEditUser(): void {
		const dialog = this.dialogService.open(
			new PolymorphComponent(PopupEditDataUserComponent, this._injector),
			{
				data: this.user,
				size: 'm',
				width: 1000,
			},
		)
		dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe();

	}

	public popupDeleteUser(user: UserBackend): void {

		const dialog = this.confirmDialogService.open(
			new PolymorphComponent(PopupDeleteComponent, this._injector),
			{
				footer: this.footerTemp,
				data: { message: 'Вы действительно хотите удалить пользователя ?' }
			},
		).subscribe((result)=>{
			if(result) {
				this._store.dispatch(UsersActions.deleteUser({id: user.id}))
			}
		})

	}



	private _setUserInForm(user: UserBackend): void {
		if (user.roles && user.roles.length > 0) {
			this.myForm.patchValue({
				email: user.email,
				role: user.roles[0].name
			});
		};
	}
}
