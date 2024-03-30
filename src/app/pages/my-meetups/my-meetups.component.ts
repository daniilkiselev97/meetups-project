import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyMeetupsComponent {

}
