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
  //***************************Properties Section *********************/
  securityObject: UserAuth = new UserAuth();
  readonly APIUrl_UserAuth = environment.APIUrl + 'Users';

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userrole: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  resetSecurityObject(): void {
    this.securityObject.id = '';
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.role = '';
  }

  constructor(private http: HttpClient, private router: Router) {}
  //****************** Make Properties Oberservable *******************/

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get loggedinUsername() {
    return this.username.asObservable();
  }

  get role() {
    return this.userrole.asObservable();
  }

  get isAdmin() {
    return this.admin.asObservable();
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
          this.userrole.next(this.securityObject.role);
          this.router.navigate(['userprofile/dashboard']);
          localStorage.setItem('uid', this.securityObject.id);
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
          localStorage.setItem('username', this.securityObject.userName);
          localStorage.setItem('role', this.securityObject.role);
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
    this.admin.next(false);
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    this.router.navigate(['/login']);
  }

  changepwd(param: any) {
    //console.log(param);
    return this.http.put(this.APIUrl_UserAuth + '/changepwd', param).subscribe({
      next: (result) => {
        alert('Password has been changed!');
      },
      error: (err) => {
        alert('Password Change failed.');
      },
    });
  }
}
