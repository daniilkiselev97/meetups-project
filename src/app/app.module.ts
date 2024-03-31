import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {TuiExpandModule, TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {TuiInputModule, TuiFieldErrorPipeModule} from '@taiga-ui/kit';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { CardMeetupComponent } from './components/card-meetup/card-meetup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthorizationComponent } from "./pages/authorization/authorization.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllMeetupsComponent,
    MyMeetupsComponent,
    UsersComponent,
    CardMeetupComponent,
		AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiExpandModule, 
    TuiButtonModule,
		ReactiveFormsModule,
		HttpClientModule,
		TuiInputModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule
],
  providers: [
		{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
