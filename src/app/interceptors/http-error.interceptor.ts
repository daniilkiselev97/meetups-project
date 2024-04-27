import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, take, throwError } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
	const tuiAlertService = inject(TuiAlertService);
	

	return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
				console.log(error)
				tuiAlertService.open(error.message, {
					status: 'error',
					autoClose: 3000
				}).pipe(
					take(1)
				).subscribe();

        return throwError(() => error);
      })
    );
};