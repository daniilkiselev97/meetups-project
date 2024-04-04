import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly _authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
		
		return this._authService.token$.pipe(
			tap((token) => {
				const isApiUrl = request.url.startsWith(environment.backendOrigin);

				if (token && isApiUrl) {
					request = request.clone({
						setHeaders: { Authorization: `Bearer ${token}` },
					})
				}

			}),
			switchMap(() => next.handle(request))
		)
  }
}
