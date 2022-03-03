import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate() {
    const token = localStorage.getItem('bearerToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      alert('Please Login First');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
