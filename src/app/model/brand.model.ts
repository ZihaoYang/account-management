import {Account} from "./account.model";
export class Brand {
  constructor(public name: string, public salecategory: string,
              public logo: string, public totalAccountNum: number, public adminAccount: Account, public id?: number) {
  }
}
