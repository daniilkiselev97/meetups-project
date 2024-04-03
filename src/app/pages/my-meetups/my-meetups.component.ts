import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import {  MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyMeetupsComponent {

	public myMeetups$: Observable<Meetup[]> = this._myMeetupsService.myMeetups$;

	constructor(
		private readonly _myMeetupsService: MeetupsService
	) {}

	public clickCreateMeetup(): void {
		
	}

}
