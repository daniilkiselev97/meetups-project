import { Component, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { EditingDataComponent } from '../editing-data/editing-data.component';

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent {
	private readonly dialog = this.dialogs.open<number>(
		new PolymorpheusComponent(EditingDataComponent, this.injector),
		{
			data: 237,
			dismissible: false,
			size: 'l',
		},
	);
	constructor(
		@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		private _router: Router
	) { }

	goEditingData(): void {
		this.dialog.subscribe({
			next: data => {
				console.log(`Dialog emitted data = ${data}`);
			},
			complete: () => {
				console.log('Dialog closed');
			},
		});
	}



}
