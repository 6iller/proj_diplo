import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isLogged()) {
      return this.router.createUrlTree(['/auth']);
    }
    const roles = route.data['roles'] as string[] | undefined;
    if (roles && !roles.includes(this.auth.currentUser || '')) {
      // не admin → редирект на main
      return this.router.createUrlTree(['/cards']);
    }
    return true;
  }
}