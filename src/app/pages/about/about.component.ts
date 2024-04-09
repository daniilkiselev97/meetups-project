import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TuiLinkModule } from '@taiga-ui/core/components/link';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiLinkModule, RouterLinkActive, RouterLink]
})
export class AboutComponent {

}
