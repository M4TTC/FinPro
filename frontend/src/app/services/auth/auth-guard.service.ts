import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private UserAuth: UserAuthService
  ) {}
  LoggedIn!: Observable<boolean>;

  canActivate() {
    const token = localStorage.getItem('bearerToken');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      alert('Please Login First');
      this.UserAuth.loggedIn.next(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
