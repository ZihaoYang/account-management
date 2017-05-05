import {Http, Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Account} from "../model/account.model";
import "rxjs/Rx";
@Injectable()
export class AccountService {
  private result: String;

  private credentialStr: string;

  account: Account;
  isLoggedIn = false;
  redirectUrl: string = '/';

  constructor(private http: Http) {
  }

  authenticate(credentials, callback?: (isSuccess) => void) {
    this.credentialStr = btoa(credentials.username + ":" + credentials.password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({headers: headers});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', credentials.username);
    urlSearchParams.append('password', credentials.password);
    this.http.post('http://localhost:8080/login', urlSearchParams.toString(), options)
      .map((response: Response) => response.json())
      .subscribe(
        data => {
          console.log(data);
          if (data.name) {
            this.isLoggedIn = true;
            this.account = data;
            console.log(data.roles[0]);
            sessionStorage.setItem('user', JSON.stringify(this.account));
          }
          else {
            this.isLoggedIn = false;
          }
          callback && callback(this.isLoggedIn);
        },
        error => {
          console.log(error);
          this.isLoggedIn = false;
          callback && callback(this.isLoggedIn);
        }
      );
  }

  checkBugeLogin(): boolean {
    let userStr = sessionStorage.getItem('user');
    let user = JSON.parse(userStr);
    if (userStr) {
      this.isLoggedIn = true;
      if (user.roles[0] == 'ADMIN') {
        return true;
      }
    }
    else {
      this.isLoggedIn = false;
    }
    return false;

  }

  checkDealerLogin(): boolean {
    let userStr = sessionStorage.getItem('user');
    let user = JSON.parse(userStr);
    if (userStr) {
      this.isLoggedIn = true;
      if (user.roles[0] == 'BRAND') {
        return true;
      }
    }
    else {
      this.isLoggedIn = false;
    }
    return false;

  }

}

