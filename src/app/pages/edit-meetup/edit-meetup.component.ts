import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
	selector: 'app-edit-meetup',
	templateUrl: './edit-meetup.component.html',
	styleUrls: ['./edit-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMeetupComponent {
	readonly myForm = new FormGroup({
		title: new FormControl(''),
		date: new FormControl(new TuiDay(2025, 3, 2)),
});



}
