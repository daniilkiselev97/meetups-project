import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TuiSvgModule, TuiExpandModule, TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule, TuiPrimitiveTextfieldModule, TuiLinkModule } from '@taiga-ui/core';
import { TuiInputModule, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputTimeModule, TuiTextareaModule, TuiRadioLabeledModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiDialogModule } from '@taiga-ui/core';
import { of } from 'rxjs';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';
import { CommonModule } from '@angular/common';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import {
	TuiDataListModule,
} from '@taiga-ui/core';
import {
	TuiDataListWrapperModule,
	TuiSelectModule,
	TuiSliderModule,
	TuiCheckboxLabeledModule
} from '@taiga-ui/kit';



//TUI_INPUT_TIME_OPTIONS

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { CardMeetupComponent } from './components/card-meetup/card-meetup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthorizationComponent } from "./pages/authorization/authorization.component";
import { PopupEditMeetupComponent } from './components/popup-edit-meetup/popup-edit-meetup.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { PopupEditDataUserComponent } from './components/popup-edit-user/popup-edit-user.component';
import { CardMeetupAtomComponent } from './components/card-meetup-atom/card-meetup-atom.component';
import { CardMeetupMyComponent } from './components/card-meetup-my/card-meetup-my.component';
import { CardDatePipe } from './pipes/card-date.pipe';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PopupCreateMeetupComponent } from './components/popup-create-meetup/popup-create-meetup.component';
import { PopupDeleteMeetupComponent } from './components/popup-delete-meetup/popup-delete-meetup.component';
import { PopupCreateUserComponent } from './components/popup-create-user/popup-create-user.component';
import { PopupDeleteUserComponent } from './components/popup-delete-user/popup-delete-user.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AllMeetupsComponent,
		MyMeetupsComponent,
		UsersComponent,
		CardMeetupComponent,
		AuthorizationComponent,
		PopupEditMeetupComponent,
		CardUserComponent,
		CardMeetupAtomComponent,
		CardMeetupMyComponent,
		CardDatePipe,
		RegistrationComponent,
		PopupCreateMeetupComponent,
		PopupDeleteMeetupComponent,
		PopupEditDataUserComponent,
  	PopupCreateUserComponent,
   PopupDeleteUserComponent,
   AboutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		TuiRootModule,
		TuiExpandModule,
		TuiButtonModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		TuiInputModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputDateModule,
		TuiInputTimeModule,
		TuiTextareaModule,
		TuiTextfieldControllerModule,
		TuiPrimitiveTextfieldModule,
		TuiSvgModule,
		TuiRadioLabeledModule,
		TuiLinkModule,
		TuiInputPasswordModule,
		CommonModule,
		TuiAutoFocusModule,
		TuiDataListModule,
		TuiDataListWrapperModule,
		TuiSelectModule,
		TuiSliderModule,
		TuiDialogModule,
		TuiCheckboxLabeledModule

	],
	providers: [
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

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
