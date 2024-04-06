import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetupsComponent } from './pages/all-meetups/all-meetups.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
	{
		path: 'all-meetups',
		component: AllMeetupsComponent,
	},
	{
		path: 'my-meetups',
		component: MyMeetupsComponent,
	},
	{
		path: 'users',
		component: UsersComponent,
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
