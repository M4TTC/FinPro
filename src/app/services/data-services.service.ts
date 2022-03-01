import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServicesService {
  readonly APIDataUrl = 'http://localhost:5281/api/findata/';

  constructor(private http: HttpClient) {}

  getSymbols(param: string[]) {
    console.log(param);
    let apiurl = this.APIDataUrl + param;
    return this.http.get(apiurl);
  }
}
