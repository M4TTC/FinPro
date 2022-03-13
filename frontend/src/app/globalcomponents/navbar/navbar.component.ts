import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private route: Router,
    private UserAuth: UserAuthService,
    private canAccess: AuthGuardService
  ) {}
  username: any;
  LoggedIn!: Observable<boolean>;

  ngOnInit(): void {
    this.LoggedIn = this.UserAuth.isLoggedIn;
    this.UserAuth.loggedinUsername.forEach(
      (result) => (this.username = result)
    );
    this.LoggedIn.forEach((result) => {
      if (result == true) {
        this.username = localStorage.getItem('username');
      }
    });
  }
  //**************************** ACTIONS SECTION *************************/
  logoclick() {
    this.route.navigate(['']);
  }
  login() {
    this.route.navigate(['login']);
  }
  signup() {
    this.route.navigate(['signup']);
  }
  logout() {
    this.UserAuth.logout();
  }

  //****************************** NAVIGATION SECTION *********************/
  navToDashboard() {
    if (this.canAccess.canActivate()) {
      this.route.navigate(['userprofile/dashboard']);
    }
  }

  navToSettings() {
    if (this.canAccess.canActivate()) {
      this.route.navigate(['userprofile/settings']);
    }
  }
}
