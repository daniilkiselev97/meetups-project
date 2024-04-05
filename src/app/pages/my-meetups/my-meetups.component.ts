import { ChangeDetectionStrategy, Component, Input, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PopupCreateMeetupComponent } from 'src/app/components/popup-create-meetup/popup-create-meetup.component';


@Component({
	selector: 'my-meetups',
	templateUrl: './my-meetups.component.html',
	styleUrls: ['./my-meetups.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyMeetupsComponent {
	public myMeetups$: Observable<Meetup[]> = this._myMeetupsService.getAllMy();

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(Injector) private readonly _injector: Injector,
		private readonly _myMeetupsService: MeetupsService
	) { }

	openCreatePopup(): void {
		const dialog = this._tuiDialogService.open<void>(
			new PolymorpheusComponent(PopupCreateMeetupComponent, this._injector),
			{
				dismissible: false,
				size: 'l',
			},
		);

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
