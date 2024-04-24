import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Inject, Injector, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { PopupEditDataUserComponent } from 'src/app/components/popup-edit-user/popup-edit-user.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, first, of, switchMap, take, tap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiInputModule } from '@taiga-ui/kit';
import { NgIf } from '@angular/common';


//prizma
import { NgModule } from '@angular/core';
import { PolymorphComponent, PrizmConfirmDialogService, PrizmDialogService, PrizmInputTextModule } from '@prizm-ui/components';
import { FormsModule } from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import { PrizmIconsSvgModule, prizmIconSvgEditorDecorBroom, prizmIconSvgSettingsToolsDeleteContent } from '@prizm-ui/icons';
import {
	PRIZM_ICONS_SVG_SET,
	prizmIconSvgDateTimeCalendarPlus,
	PrizmIconSvgEnum,
	prizmIconSvgProductionIndustrySnakeCup,
	prizmIconSvgSettingsToolsBan,
	PrizmIconsSvgRegistry,
} from '@prizm-ui/icons';
import { PopupEditMeetupComponent } from '../popup-edit-meetup/popup-edit-meetup.component';
import { PrizmButtonModule } from '@prizm-ui/components';




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
	dialog: any;

	constructor(
		@Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _destroyRef: DestroyRef,
		private readonly _usersService: UsersService,
		private readonly iconRegistry: PrizmIconsSvgRegistry,
		private readonly confirmDialogService: PrizmConfirmDialogService,
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

		this.dialog = this.confirmDialogService.open(
			new PolymorphComponent(PopupDeleteComponent, this._injector),
			{
				footer: this.footerTemp,
				data: { message: 'Вы действительно хотите удалить пользователя ?' }
			},
		)
		this.dialog.pipe(
			takeUntilDestroyed(this._destroyRef),
			switchMap(result => {
				if (result) {
					return this._usersService.deleteUser(user.id).pipe(
						finalize(() => {
							// Закрываем модальное окно после выполнения операции удаления
							this.dialog.complete();
						})
					);
				} else {
					return of(null); // Возвращаем Observable, чтобы цепочка не была оборвана
				}
			})
		).subscribe(
			() => {
				// Успешно выполнено
			},
			(error: any) => {
				console.error('Ошибка при удалении митапа:', error);
			}
		)
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
