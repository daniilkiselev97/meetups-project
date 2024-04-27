import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IsAuth } from '../models/auth.models';
import { User } from '../models/user.models';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as Actions from '../store/auth/auth.actions'
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.models';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, NgIf, RouterLinkActive, AsyncPipe]
})
export class HeaderComponent {
	public authUser$: Observable<User | null> = this._authService.authUser$
  public isAuth$: Observable<boolean> = this._authService.isAuth$


	constructor(
    private readonly _authService: AuthService,
		private _store: Store<AuthState>
	) {

	}

	public logout(): void {
    // this._authService.logout()
		this._store.dispatch(Actions.logout())
		this._store.dispatch(Actions.logoutSuccess())
  }


}
