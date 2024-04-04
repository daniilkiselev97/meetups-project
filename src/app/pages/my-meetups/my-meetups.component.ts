import { ChangeDetectionStrategy, Component, Input, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {  PopupEditMeetupComponent } from '../../components/popup-edit-meetup/popup-edit-meetup.component';


@Component({
	selector: 'my-meetups',
	templateUrl: './my-meetups.component.html',
	styleUrls: ['./my-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyMeetupsComponent {
	private readonly dialog = this.dialogs.open<number>(
		new PolymorpheusComponent(PopupEditMeetupComponent, this.injector),
		{
			data: 237,
			dismissible: false,
			size: 'l',
		},
	);

	public myMeetups$: Observable<Meetup[]> = this._myMeetupsService.getAllMy();

	constructor(
		@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		private readonly _myMeetupsService: MeetupsService
	) { }

	showDialog(): void {
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
