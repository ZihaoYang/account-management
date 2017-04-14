import {Account} from "./account.model";
export class Branch {
  constructor(public id: number, public name: string, public address: string,
              public cityCode: number, public accounts: Account[]) {
  }
}
