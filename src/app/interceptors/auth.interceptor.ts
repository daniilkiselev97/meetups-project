import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

	return authService.token$.pipe(
		tap((token) => {
			const isApiUrl = request.url.startsWith(environment.backendOrigin);

			if (token && isApiUrl) {
				request = request.clone({
					setHeaders: { Authorization: `Bearer ${token}` },
				})
			}

		}),
		switchMap(() => next(request))
	)
};