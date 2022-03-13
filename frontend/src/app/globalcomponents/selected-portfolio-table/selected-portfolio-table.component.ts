import { Component, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { DialogData } from './pfModels';

@Component({
  selector: 'app-selected-portfolio-table',
  templateUrl: './selected-portfolio-table.component.html',
  styleUrls: ['./selected-portfolio-table.component.css'],
})
export class SelectedPortfolioTableComponent {
  @Input() selectedPortfolio: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Symbol', 'Company', 'Date', '1-Day VaR'];
  pfProfile: DialogData = {
    uid: '',
    pfName: '',
    pfSymbols: [],
  };

  constructor(
    private canAccess: AuthGuardService,
    public dialog: MatDialog,
    private userauth: UserAuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.selectedPortfolio);
  }

  getTotalCost(): void {
    //  return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // console.log('aa')
  }

  //Open Dialog to save Portfolio

  openDialog(): void {
    if (this.canAccess.canActivate()) {
      const dialogRef = this.dialog.open(SavePortDialog, {
        width: '250px',
        data: {
          name: this.pfProfile.pfName,
          symbols: this.pfProfile.pfSymbols,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.dataSource.data.forEach((ele: any) => {
          if (localStorage.getItem('uid') == null) {
            alert('Please Login First.');
            this.userauth.resetSecurityObject();
            this.userauth.loggedIn.next(false);
            this.route.navigate(['login']);
          } else {
            this.pfProfile.pfSymbols.push(ele.symbol);
            this.pfProfile.uid = localStorage.getItem('uid');
            this.pfProfile.pfName = result;
            //console.log(this.pfProfile);
          }
        });
      });
    }
  }
}

//SAVE DIALOG
@Component({
  selector: 'save-port-dialog',
  templateUrl: 'save-portfolio-dialog.html',
})
export class SavePortDialog {
  constructor(
    public dialogRef: MatDialogRef<SavePortDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private canAccess: AuthGuardService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePf() {
    console.log('pfName');
  }
}
