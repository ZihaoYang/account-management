import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class MitCitySelectService {

  constructor(private http: Http) {
  }

  getAddress() {
    return this.http.get('./assets/china_address.json').map(res => res.json());
  }

  // getDistrictName(){
  //   // console.log(this.http.get('./assets/china_address.json').map( res => res.json() ));
  //   return this.http.get('./assets/china_address.json').map( res => res.json() );
  // }


}
