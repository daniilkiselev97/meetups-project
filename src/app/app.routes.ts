import { Routes } from "@angular/router";
import { adminGuard } from "../shared/guards/admin.guard";
import { authGuard } from "../shared/guards/auth.guard";


export const routes: Routes = [
	{
		path: 'all-meetups',
		loadComponent: () => import('../shared/pages/all-meetups/all-meetups.component').then(c => c.AllMeetupsComponent),
		canActivate: [authGuard]
	},
	{
		path: 'my-meetups',
		loadComponent: () => import('../shared/pages/my-meetups/my-meetups.component').then(c => c.MyMeetupsComponent),
		canActivate: [authGuard]
	},
	{
		path: 'about',
		loadComponent: () => import('../shared/pages/about/about.component').then(c => c.AboutComponent),
	},
	{
		path: 'users',
		loadComponent: () => import('../shared/pages/users/users.component').then(c => c.UsersComponent),
		canActivate: [adminGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('../shared/pages/authorization/authorization.component').then(c => c.AuthorizationComponent),
	},
	{
		path: 'registration',
		loadComponent: () => import('../shared/pages/registration/registration.component').then(c => c.RegistrationComponent),
	},
	{
		path: '**',
		redirectTo: 'my-meetups',
		pathMatch: 'full'
	}
];