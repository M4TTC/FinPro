import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPortfolioService {
  readonly APIUrl_UserPf = environment.APIUrl + 'UserPortfolios';

  constructor(private http: HttpClient) {}
  getUserPfList(param: any) {
    let params = new HttpParams().set('username', param);
    return this.http.get(this.APIUrl_UserPf, { params: params });
  }
}
