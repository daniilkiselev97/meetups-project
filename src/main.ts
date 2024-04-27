import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule, } from '@taiga-ui/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './app/interceptors/http-error.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { authReducer } from './app/store/auth/auth.reducers';
import { AuthEffects } from './app/store/auth/auth.effects';





bootstrapApplication(AppComponent, {
	providers: [
		provideAnimations(),
		provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor])),
		provideStore(authReducer),
		provideEffects([AuthEffects]),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideRouterStore(),
		importProvidersFrom(TuiRootModule, TuiDialogModule, TuiAlertModule),
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
	]
}).catch(err => console.error(err));
