import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
	{
		path: 'all-meetups',
		component: AllMeetupsComponent,
		canActivate: [authGuard]
	},
	{
		path: 'my-meetups',
		component: MyMeetupsComponent,
		canActivate: [authGuard]
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'users',
		component: UsersComponent,
		canActivate: [authGuard]
	},
	{
		path: 'login',
		component: AuthorizationComponent,
	},
	{
		path: 'registration',
		component: RegistrationComponent
	}
	

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
