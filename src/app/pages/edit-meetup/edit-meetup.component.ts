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
		short_description: new FormControl('', Validators.required),
		detailed_description: new FormControl('', Validators.required),
		target_audience: new FormControl('Аналитики, тестировщики, зумеры...', Validators.required),
		what_need_to_know: new FormControl('', Validators.required),
		what_will_happen: new FormControl('', Validators.required),
		why_do_i_have_to_come: new FormControl('', Validators.required),
	});

	items1 = tuiCreateTimePeriods();



}
