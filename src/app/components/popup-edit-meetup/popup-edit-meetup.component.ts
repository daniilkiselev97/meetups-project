import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { tuiCreateTimePeriods, tuiInputTimeOptionsProvider } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';


@Component({
	selector: 'popup-edit-meetup',
	templateUrl: './popup-edit-meetup.component.html',
	styleUrls: ['./popup-edit-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		tuiInputTimeOptionsProvider({
			icon: 'tuiIconClockLarge',
			mode: 'HH:MM:SS',
			itemSize: 's',
		}),
	]
})
export class PopupEditMeetupComponent {
	public meetup: Meetup = this.context.data;
	public readonly myForm = this._createFormEditMeetup(this.meetup)
	public timePeriods: readonly TuiTime[] = tuiCreateTimePeriods();

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, Meetup>,
		private readonly _meetupsService: MeetupsService
	) {



		// let disabled = this.disabledForm;


		// console.log({
		// 	dirty: this.myForm.dirty,
		// 	touched: this.myForm.touched,
		// 	pristine: this.myForm.pristine,
		// 	disabled
		// })

		// this.myForm.valueChanges.subscribe(() => {
		// 	disabled = this.disabledForm
		// 	console.log({
		// 		dirty: this.myForm.dirty,
		// 		touched: this.myForm.touched,
		// 		pristine: this.myForm.pristine,
		// 		disabled
		// 	})
		// })
	}

	public saveMeetup(): void {
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
		// console.log(savedDate)
		// console.log(savedDate.toISOString())

		const savedMeetup: MeetupBackend = {
			name: this.myForm.controls.name.value,
			time: savedDate.toISOString(),
			location: this.myForm.controls.location.value,
			description: this.myForm.controls.shortDescription.value,
			target_audience: this.myForm.controls.targetAudience.value,
			need_to_know: this.myForm.controls.whatNeedToKnow.value,
			will_happen: this.myForm.controls.whatWillHappen.value,
			reason_to_come: this.myForm.controls.haveToCome.value,
			duration: this.myForm.controls.duration.value,
			id: this.meetup.id,
			createdBy: this.meetup.createdBy,
			owner: this.meetup.owner,
			createdAt: this.meetup.createdAt,
			users: this.meetup.users
		}

		const subs = this._meetupsService.changeMeetup(savedMeetup, savedMeetup.id ).subscribe(() => {
			subs.unsubscribe()
			this.context.completeWith()
		})
	}


	private _createFormEditMeetup(meetup: Meetup) { //меньше зависимостей (this)

		const date = new Date(meetup.time);
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();


		return new FormGroup({
			name: new FormControl(meetup.name, [Validators.required]),
			date: new FormControl(new TuiDay(year, month, day), [Validators.required]),
			time: new FormControl(new TuiTime(hours, minutes), [Validators.required]),
			duration: new FormControl(meetup.duration, [Validators.required]),
			location: new FormControl(meetup.location, [Validators.required]),
			shortDescription: new FormControl(meetup.description, [Validators.required]),
			detailedDescription: new FormControl(meetup.description, [Validators.required]),
			targetAudience: new FormControl(meetup.target_audience, [Validators.required]),
			whatNeedToKnow: new FormControl(meetup.need_to_know, [Validators.required]),
			whatWillHappen: new FormControl(meetup.will_happen, [Validators.required]),
			haveToCome: new FormControl(meetup.reason_to_come, [Validators.required]),
		});

	}

}
