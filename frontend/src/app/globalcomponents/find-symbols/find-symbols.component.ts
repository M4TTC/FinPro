import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataServicesService } from 'src/app/services/data-services.service';
import { LoadingServiceService } from 'src/app/services/loader/loading-service.service';
import { symbols } from './symbols';

@Component({
  selector: 'app-find-symbols',
  templateUrl: './find-symbols.component.html',
  styleUrls: ['./find-symbols.component.css'],
})
export class FindSymbolsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  symbolCtrl = new FormControl();
  filteredSymbols: Observable<string[]>;
  symbols: string[] = [];
  allSymbols: string[] = [];

  selectedPortfolio: object = {};
  selectedPortfolioIsEmpty: boolean = true;

  constructor(
    private dataSevices: DataServicesService,
    public loadingService: LoadingServiceService
  ) {
    this.filteredSymbols = this.symbolCtrl.valueChanges.pipe(
      startWith(null),
      map((ele) => (ele ? this._filter(ele) : this.allSymbols.slice())) // [] could be this.allSymbols.slice() to list all symbols.
    );
  }

  ngOnInit(): void {
    symbols.forEach((e) => this.allSymbols.push(e));
  }

  //************************* Autocomplete chips ********************************************* */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymbols.filter((symbol) =>
      symbol.toLowerCase().includes(filterValue)
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our symbol
    if (value) {
      this.symbols.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.symbolCtrl.setValue(null);
  }

  remove(symbol: string): void {
    const index = this.symbols.indexOf(symbol);

    if (index >= 0) {
      this.symbols.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.symbols.find((e) => e == event.option.viewValue)
      ? alert('This Ticker has been in the list already.')
      : this.symbols.push(event.option.viewValue);
    //console.log('symbols is ' + this.symbols);

    this.symbolCtrl.setValue(null);
  }
  //******************************************************************************* */

  //****************************Button Actions*************************************** */

  addToMyPortfolio() {
    if (this.symbols.length == 0) {
      alert('You Should Input At Least One Symbol to Continue!');
    } else {
      this.dataSevices.getSymbols(this.symbols).subscribe({
        next: (result: object) => {
          this.selectedPortfolio = result;
          this.selectedPortfolioIsEmpty = false;
          //console.log(this.loadingService);
        },
        //console.log('selectPt', this.selectedPortfolio)
        error: (e) => console.log(e),
      });
    }
  }

  resetPfList() {
    location.reload();
  }
  //******************************************************************************* */
}
