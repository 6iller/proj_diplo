import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterModule
} from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLogged()) return true;
    this.router.navigate(['/auth']);
    return false;
  }
}
