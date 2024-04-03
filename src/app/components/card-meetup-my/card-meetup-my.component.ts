import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Meetup } from 'src/app/models/meetup.models';

@Component({
  selector: 'card-meetup-my',
  templateUrl: './card-meetup-my.component.html',
  styleUrls: ['./card-meetup-my.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMeetupMyComponent { //компонент для страницы мои митапы
	@Input({ required: true }) meetup!: Meetup;


}
