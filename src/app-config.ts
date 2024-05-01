import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./app/interceptors/auth.interceptor";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { reducers } from "./app/store";
import { AuthEffects } from "./app/store/auth/auth.effects";
import { MeetupsEffects } from "./app/store/all-meetups/all-meetups.effects";
import { MyMeetupsEffects } from "./app/store/myMeetups/myMettups.effects";
import { UsersEffects } from "./app/store/users/users.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { EnvironmentProviders as MyEnvironmentProviders, InjectionToken, Provider, Sanitizer, importProvidersFrom, isDevMode } from "@angular/core";
import { provideRouterStore } from "@ngrx/router-store";
import { provideRouter } from "@angular/router";
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { routes } from "./app/app.routes";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_DIALOG_CLOSES_ON_BACK } from "@taiga-ui/cdk";
import { of } from "rxjs";
import { provideAnimations } from '@angular/platform-browser/animations';

export interface EnvironmentProviders {
  providers: (Provider | InjectionToken<Sanitizer> | any)[];
}

export const appConfig: EnvironmentProviders = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(reducers),
    provideEffects([AuthEffects, MeetupsEffects, MyMeetupsEffects, UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    importProvidersFrom(TuiRootModule, TuiDialogModule, TuiAlertModule),
    provideRouter(routes),
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: TUI_DIALOG_CLOSES_ON_BACK,
      useValue: of(true),
    },
  ],
};




