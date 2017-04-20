import {Subject} from "rxjs";
import {Branch} from "../model/branch.model";
import {Account} from "../model/account.model";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
@Injectable()
export class BranchService {
  branchChanged = new Subject<Branch[]>();
  // private branchs: Branch[] = [];
  private _url: string;
  private options: RequestOptions;

  constructor(private http: Http, private router: Router) {
    this._url = environment.server_url + 'branchs';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
    // this.fetchAll();
  }


  fetchAllByBrandId(brandID: number) {
    // this.http.post(this._url, brandID, this.options)
    //   .map(response => response.json()).subscribe(data => {
    //   this.branchs = data;
    //   this.branchChanged.next(this.branchs.slice());
    // }, error => this.errorHandel(error));
    // this.router.navigate(['/branchs']);
  }



  private branchs: Branch[] = [
    new Branch('厦门五缘湾红星分店',
      '安岭路990-992号森宝财富中心903单元',
      350203,
      [new Account('Dongpeng001', "123456", 1001), new Account('Dongpeng002', "123456", 1002)], 1001
    ),
    new Branch('福州红星分店',
      '安岭路990-992号森宝财富中心904单元',
      410204,
      [new Account('Dongpeng003', "123456", 1003), new Account('Dongpeng004', "123456", 1004)], 1002
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

  errorHandel(error) {
    if (error.status === 403) {
      this.router.navigate(['/signin', {msg: '1'}]);
    }
  }
}
