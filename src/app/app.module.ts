import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {TuiExpandModule, TuiButtonModule} from '@taiga-ui/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { CardMeetupComponent } from './components/card-meetup/card-meetup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllMeetupsComponent,
    MyMeetupsComponent,
    UsersComponent,
    CardMeetupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiExpandModule, 
    TuiButtonModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
