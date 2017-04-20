import {Http, Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Account} from "../../model/account.model";
import "rxjs/Rx";
@Injectable()
export class AccountService {
  private result: String;
  // constructor(private http:Http){}
  //
  // loginUser(account:Account){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
  //   return this.http.post('http://localhost:8080/login',account,{
  //     headers:headers
  //   }).map(res=>res.json())
  //     .subscribe(
  //       data=>this.result = data,
  //       err => console.log('ERROR!!!'),
  //       () => console.log('Got response from login server: ',this.result)
  //     );
  // }
  // private _loginPath = 'login';
  // private _logoutPath = 'logout?logout';
  // private _registerPath = 'register';
  // private remember = false;
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
          // console.log(data);
          if (data.name) {
            this.isLoggedIn = true;
            this.account = data;
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

}

