import {Account} from "./account.model";
export class Brand {
  constructor(public id: number, public name: string, public salecategory: string,
              public logo: string, public totalAccountNum: number, public adminAcount: Account) {
  }
}
