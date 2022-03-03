import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserAuth } from './user-auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  securityObject: UserAuth = new UserAuth();
  readonly APIUrl_UserAuth = environment.APIUrl + 'Users';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {}

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.role = '';
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get loggedinUsername() {
    return this.username.asObservable();
  }
  //****************** Sign Up Section *******************/
  signup(params: any) {
    let apiurl = this.APIUrl_UserAuth + '/signup';

    this.http
      .post(apiurl, params, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (result: object) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Username Already Exists!');
        },
      });
  }

  //****************** Log In Section *******************/
  login(entity: UserAuth) {
    this.resetSecurityObject();
    const credentials = JSON.stringify(entity);

    this.http
      .post(this.APIUrl_UserAuth + '/login', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (result: object) => {
          Object.assign(this.securityObject, result);
          this.loggedIn.next(true);
          this.username.next(this.securityObject.userName);
          this.router.navigate(['userprofile/dashboard']);
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
          localStorage.setItem('username', this.securityObject.userName);
          localStorage.setItem(
            'isLoggedIn',
            String(this.securityObject.isAuthenticated)
          );
        },
        error: (err) => {
          alert('Username Already Exists!');
        },
      });
  }

  //****************** Log Out Section *******************/
  logout() {
    this.resetSecurityObject();
    this.loggedIn.next(false);
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
