import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAuthService } from './services/auth/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FinPro';

  constructor(
    private userauth: UserAuthService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.loggedinVerify();
  }

  loggedinVerify() {
    const token = localStorage.getItem('bearerToken');
    if (
      localStorage.getItem('isLoggedIn') == 'true' &&
      token &&
      !this.jwtHelper.isTokenExpired(token)
    ) {
      this.userauth.loggedIn.next(true);
      if (localStorage.getItem('role') == 'admin') {
        this.userauth.admin.next(true);
      }
    }
  }
}
