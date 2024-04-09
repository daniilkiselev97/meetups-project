import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService, TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'popup-delete',
    templateUrl: './popup-delete.component.html',
    styleUrls: ['./popup-delete.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiTextfieldControllerModule, TuiButtonModule]
})
export class PopupDeleteComponent {
	public message: string = this.context.data.message;

	constructor(
		@Inject(TuiDialogService) private readonly _tuiDialogService: TuiDialogService,
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<{ isDelete: boolean; }, { message: string; }>,
	) {}

	public handleSubmitDelete(): void {
		this.context.completeWith({ isDelete: false });

		
	}

	public handleCancelDelete(): void {
		this.context.completeWith({ isDelete: true });
	}

}
