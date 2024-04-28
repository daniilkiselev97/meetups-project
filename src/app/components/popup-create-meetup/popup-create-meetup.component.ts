import { ChangeDetectionStrategy, Component, DestroyRef, Inject } from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule, TuiInputTimeModule, TuiTextareaModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { MeetupCreated } from 'src/app/models/meetup.models';
import { MeetupsService } from 'src/app/services/meetups.service';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { AsyncPipe } from '@angular/common';


import { PrizmInputTextModule, PrizmInputLayoutDateComponent, PrizmInputLayoutTimeComponent, PrizmButtonModule, POLYMORPH_CONTEXT } from '@prizm-ui/components';
import { Store } from '@ngrx/store';
import { MeetupsState } from 'src/app/store/allMeetups/meetups.reducers';

import * as MeetupsActions from '../../store/allMeetups/meetups.actions'


@Component({
	selector: 'app-popup-create-meetup',
	templateUrl: './popup-create-meetup.component.html',
	styleUrls: ['./popup-create-meetup.component.css'],
	providers: [

	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, TuiTextfieldControllerModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputDateModule, TuiErrorModule, TuiInputTimeModule, TuiTextareaModule, TuiButtonModule, AsyncPipe, TuiFieldErrorPipeModule, ReactiveFormsModule, FormsModule, PrizmInputTextModule, PrizmInputLayoutDateComponent, PrizmInputLayoutTimeComponent, PrizmButtonModule]
})
export class PopupCreateMeetupComponent {


	public readonly myForm = this._createFormMeetup()

	get disabledForm(): boolean {
		return (this.myForm.pristine && !this.myForm.dirty) || this.myForm.invalid;
	}

	constructor(
		@Inject(POLYMORPH_CONTEXT) readonly context: any,
		private readonly _destroyRef: DestroyRef,
		private readonly _meetupsService: MeetupsService,
		private readonly _fb: FormBuilder,
		private readonly _store: Store<MeetupsState>
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

		// this._meetupsService.createMeetup(savedMeetup)
		this._store.dispatch(MeetupsActions.createMeetup({ meetup: savedMeetup }))
			.pipe(
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
