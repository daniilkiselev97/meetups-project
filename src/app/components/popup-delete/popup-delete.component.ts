import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { POLYMORPH_CONTEXT } from '@prizm-ui/components';

@Component({
    selector: 'popup-delete',
    templateUrl: './popup-delete.component.html',
    styleUrls: ['./popup-delete.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class PopupDeleteComponent {


	public message: string = this.context.data.message

	constructor(
		@Inject(POLYMORPH_CONTEXT) readonly context: any
	) {
		
	}

}
