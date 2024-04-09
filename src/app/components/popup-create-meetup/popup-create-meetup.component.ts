import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService, TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiButtonModule } from '@taiga-ui/core';
import { tuiCreateTimePeriods, tuiInputTimeOptionsProvider, TuiInputModule, TuiInputDateModule, TuiInputTimeModule, TuiTextareaModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { Meetup, MeetupBackend, MeetupCreated } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { AsyncPipe } from '@angular/common';


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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, TuiTextfieldControllerModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputDateModule, TuiErrorModule, TuiInputTimeModule, TuiTextareaModule, TuiButtonModule, AsyncPipe, TuiFieldErrorPipeModule, ]
})
export class PopupCreateMeetupComponent {


	public readonly myForm = this._createFormMeetup()
	public timePeriods: readonly TuiTime[] = tuiCreateTimePeriods();

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, Meetup>,
		private readonly _destroyRef: DestroyRef,
		private readonly _meetupsService: MeetupsService,
		private readonly _fb: FormBuilder
	) {

	}

	public createMeetup(): void {
		if (this.myForm.valid === false) return;
		const formValues = this.myForm.value as any;

		const date = formValues.date
		const time = formValues.time
		const savedDate = new Date(date.year, date.month, date.day, time.hours, time.minutes)


		const savedMeetup: MeetupCreated = {
			name: formValues.name,
			time: savedDate.toISOString(),
			location: formValues.location,
			description: formValues.shortDescription,
			target_audience: formValues.targetAudience,
			need_to_know: formValues.whatNeedToKnow,
			will_happen: formValues.whatWillHappen,
			reason_to_come: formValues.haveToCome,
			duration: formValues.duration,
		}

		this._meetupsService.createMeetup(savedMeetup)
		.pipe(
			takeUntilDestroyed(this._destroyRef),
			take(1)
		).subscribe(() => {
			this.context.completeWith()
		})
	}


	private _createFormMeetup() {

		const date = new Date().getDate()
		const month = new Date().getMonth()
		const year = new Date().getFullYear()
		const hours = new Date().getHours()
		const minutes = new Date().getMinutes()

		return this._fb.group({
			name: new FormControl('', [Validators.required]),
			date: new FormControl(new TuiDay(year, month, date), [Validators.required]),
			time: new FormControl(new TuiTime(hours, minutes), [Validators.required]),
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
