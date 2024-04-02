import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_INPUT_TIME_OPTIONS, tuiCreateTimePeriods, tuiInputTimeOptionsProvider } from '@taiga-ui/kit';

@Component({
	selector: 'app-edit-meetup',
	templateUrl: './edit-meetup.component.html',
	styleUrls: ['./edit-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		tuiInputTimeOptionsProvider({
			icon: 'tuiIconClockLarge',
			mode: 'HH:MM:SS',
			itemSize: 's',
		}),
	]
})
export class EditMeetupComponent {
	readonly myForm = new FormGroup({
		title: new FormControl(''),
		date: new FormControl(new TuiDay(2025, 3, 2)),
		time: new FormControl(null),
		location: new FormControl(''),
		shortDescription: new FormControl('', Validators.required),
		detailedDescription: new FormControl('', Validators.required),
		targetAudience: new FormControl('', Validators.required),
		whatNeedToKnow: new FormControl('', Validators.required),
		whatWillHappen: new FormControl('', Validators.required),
		haveToCome: new FormControl('', Validators.required),
	});

	items1 = tuiCreateTimePeriods();



}
