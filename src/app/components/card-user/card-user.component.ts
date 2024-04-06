import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserAuthBackend, UserBackend } from 'src/app/models/user.models';
import { PopupEditDataUserComponent } from 'src/app/components/popup-edit-user/popup-edit-user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupDeleteUserComponent } from '../popup-delete-user/popup-delete-user.component';


type Form = FormGroup<{
	email: FormControl<string | null>;
	password: FormControl<string | null>;
	role: FormControl<string | null>;
}>;

@Component({
	selector: 'card-user',
	templateUrl: './card-user.component.html',
	styleUrls: ['./card-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardUserComponent implements OnChanges {

	@Input({ required: true }) user!: UserBackend;



	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
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
	public popupDeleteUser(user: UserBackend): void {

		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupDeleteUserComponent, this._injector),
			{
				data: this.user,
				dismissible: false,
				size: 'l',
			},
		)


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

	private _setUserInForm(user: UserBackend): void {
		// console.log(user)
		this.myForm.patchValue({
			email: user.email,
			role: user.roles[0].name
		});
	}
}
