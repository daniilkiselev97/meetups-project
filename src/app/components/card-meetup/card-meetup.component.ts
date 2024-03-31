import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-meetup',
  templateUrl: './card-meetup.component.html',
  styleUrls: ['./card-meetup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardMeetupComponent {
  private chevronDown: string = 'tuiIconChevronDown';
  private chevronUp: string = 'tuiIconChevronUp';
  public expanded: boolean = false;
	public user: string = 'tuiIconUserLarge'


  constructor() {

  }

  public getChevron(): string {
    return this.expanded ? this.chevronUp : this.chevronDown;
  }

	public clickToggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	public clickAction(): void {
		alert('Я пойду')
	}


}
