import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule, TuiInputTimeModule, TuiTextareaModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { Meetup, MeetupBackend } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { AsyncPipe } from '@angular/common';
import { PrizmInputTextModule, PrizmInputLayoutDateComponent, PrizmDay, PrizmInputLayoutTimeComponent, PrizmTime, PrizmButtonModule } from '@prizm-ui/components';
import { FormsModule, UntypedFormControl } from '@angular/forms';
import { POLYMORPH_CONTEXT } from '@prizm-ui/components';
import { Store } from '@ngrx/store';
import { MeetupsState } from 'src/app/store/all-meetups/all-meetups.model';
import * as MyMeetupsActions from '../../store/myMeetups/myMeetups.actions'

@Component({
	selector: 'popup-edit-meetup',
	templateUrl: './popup-edit-meetup.component.html',
	styleUrls: ['./popup-edit-meetup.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, TuiTextfieldControllerModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputDateModule, TuiErrorModule, TuiInputTimeModule, TuiTextareaModule, TuiButtonModule, AsyncPipe, TuiFieldErrorPipeModule, ReactiveFormsModule, FormsModule, PrizmInputTextModule, PrizmInputLayoutDateComponent, PrizmInputLayoutTimeComponent, PrizmButtonModule]
})
export class PopupEditMeetupComponent {
	public meetup: Meetup = this.context.data;

	public readonly myForm = this._createFormEditMeetup(this.meetup)

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(POLYMORPH_CONTEXT) readonly context: any,
		private readonly _meetupsService: MeetupsService,
		private readonly _destroyRef: DestroyRef,
		private readonly _fb: FormBuilder,
		private readonly _store: Store<MeetupsState>
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

		this._store.dispatch(MyMeetupsActions.changeMyMeetup({
			meetup: savedMeetup,
			id: savedMeetup.id
		}));

		this.context.completeWith();
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
			date: new UntypedFormControl(new PrizmDay(year, month, day), [Validators.required]),
			time: new FormControl(new PrizmTime(hours, minutes), [Validators.required]),
			duration: new FormControl(meetup.duration, [Validators.required]),
			location: new FormControl(meetup.location, [Validators.required]),
			shortDescription: new FormControl(meetup.description, [Validators.required, Validators.maxLength(10)]),
			detailedDescription: new FormControl(meetup.description, [Validators.required, Validators.maxLength(10)]),
			targetAudience: new FormControl(meetup.target_audience, [Validators.required, Validators.maxLength(10)]),
			whatNeedToKnow: new FormControl(meetup.need_to_know, [Validators.required, Validators.maxLength(10)]),
			whatWillHappen: new FormControl(meetup.will_happen, [Validators.required, Validators.maxLength(10)]),
			haveToCome: new FormControl(meetup.reason_to_come, [Validators.required, Validators.maxLength(10)]),
		});
	}
}
