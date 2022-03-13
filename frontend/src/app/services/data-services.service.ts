import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServicesService {
  readonly APIDataUrl = 'http://localhost:5281/api/findata/';
  userPortfolioList: UserPortfolioList = {
    uid: '',
    portfolioList: [
      {
        pfName: '',
        pfSymbols: [],
      },
    ],
  };

  constructor(private http: HttpClient) {}

  getSymbols(param: string[]) {
    let apiurl = this.APIDataUrl + param;
    return this.http.get(apiurl);
  }

  saveUserPortfolio() {}
}

export interface UserPortfolioList {
  uid: string;
  portfolioList: [{ pfName: string; pfSymbols: string[] }];
}
