import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { PrizmBaseDialogContext } from '@prizm-ui/components';
import { TuiDialogContext, TuiDialogService, TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { PRIZM_DIALOG_PROVIDERS } from '@prizm-ui/components';
import { POLYMORPH_CONTEXT } from '@prizm-ui/components';

@Component({
    selector: 'popup-delete',
    templateUrl: './popup-delete.component.html',
    styleUrls: ['./popup-delete.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiTextfieldControllerModule, TuiButtonModule]
})
export class PopupDeleteComponent {


	public message: string = this.context.data.message

	constructor(
		@Inject(POLYMORPH_CONTEXT) readonly context: any
		
	) {}

}
