import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiRootModule, HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'meetups-project';
}
