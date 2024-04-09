import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService, TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiButtonModule } from '@taiga-ui/core';
import { tuiCreateTimePeriods, tuiInputTimeOptionsProvider, TuiInputModule, TuiInputDateModule, TuiInputTimeModule, TuiTextareaModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { AsyncPipe } from '@angular/common';



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
    ],
    standalone: true,
    imports: [ReactiveFormsModule, TuiTextfieldControllerModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputDateModule, TuiErrorModule, TuiInputTimeModule, TuiTextareaModule, TuiButtonModule, AsyncPipe, TuiFieldErrorPipeModule]
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
		private readonly _meetupsService: MeetupsService,
		private readonly _destroyRef: DestroyRef,
		private readonly _fb: FormBuilder
	) {

	}

	public saveMeetup(): void {
		if (this.myForm.valid === false) return;
		const formValues = this.myForm.value as any;
		

		const date = formValues.date;
		const time = formValues.time;
		const savedDate = new Date(date.year, date.month, date.day, time.hours, time.minutes);
	

		const savedMeetup: MeetupBackend = {
			name: formValues.name,
			time: savedDate.toISOString(),
			location: formValues.location,
			description: formValues.shortDescription,
			target_audience: formValues.targetAudience,
			need_to_know: formValues.whatNeedToKnow,
			will_happen: formValues.whatWillHappen,
			reason_to_come: formValues.haveToCome,
			duration: formValues.duration,
			id: this.meetup.id,
			createdBy: this.meetup.createdBy,
			owner: this.meetup.owner,
			createdAt: this.meetup.createdAt,
			users: this.meetup.users
		}

		this._meetupsService.changeMeetup(savedMeetup, savedMeetup.id )
		.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe(() => {
			this.context.completeWith();
		})
	}


	private _createFormEditMeetup(meetup: Meetup) { 

		const date = new Date(meetup.time);
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();


		return this._fb.group({
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
