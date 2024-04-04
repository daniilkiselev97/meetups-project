import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import {  Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { EditingDataComponent } from 'src/app/pages/editing-data/editing-data.component';

@Component({
  selector: 'card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardUserComponent {
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
		){

	}

	openEditingData(): void {
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
