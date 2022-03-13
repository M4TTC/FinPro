import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent {
  userrole!: any;
  isAdmin: boolean = false;
  LoggedIn!: Observable<boolean>;

  constructor(private userauth: UserAuthService) {}

  ngOnInit(): void {
    this.userauth.userrole.forEach((result) => {
      if (result == 'admin') {
        this.userrole = result;
        this.isAdmin = true;
      }
    });
    this.userauth.isAdmin.forEach((result) => {
      if (result == true) {
        this.isAdmin = true;
      }
    });
  }
}
