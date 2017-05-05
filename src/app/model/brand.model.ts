import {Account} from "./account.model";
import {Branch} from "./branch.model";
export class Brand {
  constructor(public name: string, public salecategory: string,
              public logo: string, public totalAccountNum: number, public adminAccount: Account, public id?: number, public branches?: Branch[]) {
  }
}
