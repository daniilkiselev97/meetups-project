import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser$.pipe(
		map((user) => {
			if(user === null) return false
			return user.rolesObj.isAdmin
		}),
		tap(isAdmin => {
      if (isAdmin === false) router.navigateByUrl('login');
    })
	)
};
