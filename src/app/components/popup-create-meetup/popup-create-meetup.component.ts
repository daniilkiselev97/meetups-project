import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { tuiCreateTimePeriods, tuiInputTimeOptionsProvider } from '@taiga-ui/kit';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-popup-create-meetup',
  templateUrl: './popup-create-meetup.component.html',
  styleUrls: ['./popup-create-meetup.component.css'],
	providers: [
		tuiInputTimeOptionsProvider({
			icon: 'tuiIconClockLarge',
			mode: 'HH:MM:SS',
			itemSize: 's',
		}),
	],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupCreateMeetupComponent {

	public meetup: Meetup = this.context.data;
	public readonly myForm = this._createFormMeetup(this.meetup)
	public timePeriods: readonly TuiTime[] = tuiCreateTimePeriods();

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, Meetup>,
		private readonly _meetupsService: MeetupsService
	) {

	}

	public createMeetup(): void {
		if (this.myForm.controls.name.value === null) return;
		if (this.myForm.controls.date.value === null) return;
		if (this.myForm.controls.time.value === null) return;
		if (this.myForm.controls.location.value === null) return;
		if (this.myForm.controls.shortDescription.value === null) return;
		if (this.myForm.controls.detailedDescription.value === null) return;
		if (this.myForm.controls.targetAudience.value === null) return;
		if (this.myForm.controls.whatNeedToKnow.value === null) return;
		if (this.myForm.controls.whatWillHappen.value === null) return;
		if (this.myForm.controls.haveToCome.value === null) return;
		if (this.myForm.controls.duration.value === null) return;



		const date = this.myForm.controls.date.value
		const time = this.myForm.controls.time.value
		const savedDate = new Date(date.year, date.month, date.day, time.hours, time.minutes)
	

		const savedMeetup: MeetupCreated = {
			name: this.myForm.controls.name.value,
			time: savedDate.toISOString(),
			location: this.myForm.controls.location.value,
			description: this.myForm.controls.shortDescription.value,
			target_audience: this.myForm.controls.targetAudience.value,
			need_to_know: this.myForm.controls.whatNeedToKnow.value,
			will_happen: this.myForm.controls.whatWillHappen.value,
			reason_to_come: this.myForm.controls.haveToCome.value,
			duration: this.myForm.controls.duration.value,
			// id: this.meetup.id,
			// createdBy: this.meetup.createdBy,
			// owner: this.meetup.owner,
			// createdAt: this.meetup.createdAt,
			// users: this.meetup.users
		}

		const subs = this._meetupsService.createMeetup(savedMeetup).subscribe(() => {
			subs.unsubscribe()
			this.context.completeWith()
		})
	}


	private _createFormMeetup(meetup: Meetup) { //меньше зависимостей (this)

		// const date = new Date(meetup.time);
		// const year = date.getFullYear();
		// const month = date.getMonth();
		// const day = date.getDate();
		// const hours = date.getHours();
		// const minutes = date.getMinutes();


		return new FormGroup({
			name: new FormControl('', [Validators.required]),
			date: new FormControl(new TuiDay(2024, 3, 10), [Validators.required]),
			time: new FormControl(new TuiTime(18, 15), [Validators.required]),
			duration: new FormControl(60, [Validators.required]),
			location: new FormControl('', [Validators.required]),
			shortDescription: new FormControl('', [Validators.required]),
			detailedDescription: new FormControl('', [Validators.required]),
			targetAudience: new FormControl('', [Validators.required]),
			whatNeedToKnow: new FormControl('', [Validators.required]),
			whatWillHappen: new FormControl('', [Validators.required]),
			haveToCome: new FormControl('', [Validators.required]),
		});
	}

}
