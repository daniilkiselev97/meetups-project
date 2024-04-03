import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';

@Component({
	selector: 'card-meetup',
	templateUrl: './card-meetup.component.html',
	styleUrls: ['./card-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardMeetupComponent {  //компонент для страницы все митапы
	@Input({ required: true }) meetup!: Meetup;


}
