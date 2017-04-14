import {Subject} from "rxjs";
import {Branch} from "../model/branch.model";
import {Account} from "../model/account.model";
export class BranchService {
  branchChanged = new Subject<Branch[]>();
  private branchs: Branch[] = [
    new Branch(1001, '厦门五缘湾红星分店',
      '安岭路990-992号森宝财富中心903单元',
      350203,
      [new Account(1001, 'Dongpeng001', "123456"), new Account(1002, 'Dongpeng002', "123456")]
    ),
    new Branch(1002, '福州红星分店',
      '安岭路990-992号森宝财富中心904单元',
      410204,
      [new Account(1001, 'Dongpeng003', "123456"), new Account(1002, 'Dongpeng004', "123456")]
    )
  ];

  setBranchs(branchs: Branch[]) {
    this.branchs = branchs;
    this.branchChanged.next(this.branchs.slice());
  }

  getBranchs() {
    return this.branchs.slice();
  }

  getBranch(index: number) {
    return this.branchs[index];
  }

  addBranch(branch: Branch) {
    this.branchs.push(branch);
    this.branchChanged.next(this.branchs.slice());
  }

  updateBranch(index: number, newBranch: Branch) {
    this.branchs[index] = newBranch;
    this.branchChanged.next(this.branchs.slice());
  }

  deleteBranch(index: number) {
    this.branchs.splice(index, 1);
    this.branchChanged.next(this.branchs.slice());
  }
}
