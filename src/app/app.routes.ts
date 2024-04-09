import { Routes } from "@angular/router";
import { adminGuard } from "./guards/admin.guard";
import { authGuard } from "./guards/auth.guard";


export const routes: Routes = [
	{
		path: 'all-meetups',
		loadComponent: () => import('./pages/all-meetups/all-meetups.component').then(c => c.AllMeetupsComponent),
		canActivate: [authGuard]
	},
	{
		path: 'my-meetups',
		loadComponent: () => import('./pages/my-meetups/my-meetups.component').then(c => c.MyMeetupsComponent),
		canActivate: [authGuard]
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent),
	},
	{
		path: 'users',
		loadComponent: () => import('./pages/users/users.component').then(c => c.UsersComponent),
		canActivate: [adminGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./pages/authorization/authorization.component').then(c => c.AuthorizationComponent),
	},
	{
		path: 'registration',
		loadComponent: () => import('./pages/registration/registration.component').then(c => c.RegistrationComponent),
	}
	

];