import { ChangeDetectionStrategy, Component, Inject, Injector, Input } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserAuthBackend } from 'src/app/models/user.models';
import { PopupEditDataUserComponent } from 'src/app/components/popup-edit-user/popup-edit-user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupDeleteUserComponent } from '../popup-delete-user/popup-delete-user.component';


@Component({
	selector: 'card-user',
	templateUrl: './card-user.component.html',
	styleUrls: ['./card-user.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardUserComponent {

	@Input({ required: true }) user!: UserAuthBackend;



	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
	) {

	}


	myForm = new FormGroup({
		email: new FormControl(this.user?.email, [Validators.required]),
		password: new FormControl(this.user?.password, [Validators.required]),
		role: new FormControl(this.user?.roles[0]?.name)
	});

	popupEditUser(): void {

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
		popupDeleteUser(user: UserAuthBackend): void {

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


}
