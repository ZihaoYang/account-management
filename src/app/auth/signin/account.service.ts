import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Account} from "../../model/account.model";
@Injectable()
export class BrandService {
  constructor(private http:Http){}

  loginUser(account:Account){
    return this.http.post('',account);
  }
}
