import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IsAuth } from '../models/auth.models';
import { User } from '../models/user.models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HeaderComponent {
	public authUser$: Observable<User | null> = this._authService.authUser$.pipe(
		// tap(console.log)
	)
  public isAuth$: Observable<boolean> = this._authService.isAuth$


	constructor(
    private readonly _authService: AuthService

	) {

	}

	public logout(): void {
    this._authService.logout()
  }


}
