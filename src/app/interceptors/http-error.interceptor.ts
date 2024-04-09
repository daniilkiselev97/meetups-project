import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
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
        // Логируем ошибку в консоль
        // console.error('HTTP Error Intercepted:', error);
        // Можно выполнить другие действия с ошибкой здесь, например, перенаправление на страницу ошибки

        // Возвращаем ошибку обратно в Observable, чтобы компоненты могли продолжить обработку
        return throwError(() => error);
      })
    );
};