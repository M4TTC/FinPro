import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-selected-portfolio-table',
  templateUrl: './selected-portfolio-table.component.html',
  styleUrls: ['./selected-portfolio-table.component.css'],
})
export class SelectedPortfolioTableComponent {
  @Input() selectedPortfolio: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Symbol', 'Company', 'Date', '1-Day VaR'];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.selectedPortfolio);
    //console.log('ChildComponent:', this.selectedPortfolio);
  }

  getTotalCost(): void {
    //  return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    // console.log('aa')
  }

  savePortfolio() {
    //if (this.canAccess.canActivate()) {
    console.log('yes');
    //} else {
    //  console.log("no");
    // }
  }

  openDialog() {}
}
