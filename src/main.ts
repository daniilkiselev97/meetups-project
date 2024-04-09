import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule,  } from '@taiga-ui/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';



bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			TuiRootModule
		),
		provideRouter(routes),
		{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{
			provide: TUI_SANITIZER,
			useClass: NgDompurifySanitizer,
		},
		{
			provide: TUI_DIALOG_CLOSES_ON_BACK,
			useValue: of(true),
		},
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi())
	]
})
	.catch(err => console.error(err));
