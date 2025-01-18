import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn === false) {
    (inject(Router) as Router).navigate(['login']);
    return false;
  } else {
    // inject(Router).navigate(['drawing']);
    return true;
  }
};
