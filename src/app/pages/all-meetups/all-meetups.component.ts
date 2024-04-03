import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'all-meetups',
  templateUrl: './all-meetups.component.html',
  styleUrls: ['./all-meetups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AllMeetupsComponent {
	public allMeetups$: Observable<Meetup[]> = this._meetupsService.allMeetups$;

	constructor(
		private readonly _meetupsService: MeetupsService
	) {}


}
