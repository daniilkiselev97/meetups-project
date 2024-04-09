import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule,  } from '@taiga-ui/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './app/interceptors/http-error.interceptor';



bootstrapApplication(AppComponent, {
	providers: [
		provideHttpClient(
			withInterceptors([
				authInterceptor,
				httpErrorInterceptor
			])
		),
		importProvidersFrom(
			TuiRootModule,
			TuiDialogModule,
			TuiAlertModule
		),
		provideRouter(routes),
		{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },

		{
			provide: TUI_SANITIZER,
			useClass: NgDompurifySanitizer,
		},
		{
			provide: TUI_DIALOG_CLOSES_ON_BACK,
			useValue: of(true),
		},
		provideAnimations(),
	]
})
	.catch(err => console.error(err));
