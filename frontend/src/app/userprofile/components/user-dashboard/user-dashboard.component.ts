import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { UserPortfolioService } from '../../services/user-portfolio.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  panelOpenState = false;
  _username: string | null = '';

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Symbol', 'Company', 'Date', '1-Day VaR'];

  _userpf: any;
  isUserpfExist: boolean = false;

  constructor(
    private userpfservice: UserPortfolioService,
    private userauth: UserAuthService
  ) {}
  //
  ngOnInit(): void {
    this.setUsername(this._username);
    this.getUserPortfolios();
  }

  setUsername(value: string | null) {
    if (this.userauth.isLoggedIn) {
      this._username = localStorage.getItem('username');
    }
  }
  getUserPortfolios() {
    //console.log(this._username);
    this.userpfservice.getUserPfList(this._username).subscribe({
      next: (result: any) => {
        if (result != null) {
          this.isUserpfExist = true;
          this._userpf = Object.values(result)[1];
        }
        //console.log(this._userpf);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  getTotalCost() {}
}
