import {Subject} from "rxjs";
import {Branch} from "../model/branch.model";
import {Account} from "../model/account.model";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {BranchDTO} from "../model/branchDTO.model";
import {AccountDTO} from "../model/accountDTO.model";
import {FormGroup, FormArray, FormControl} from "@angular/forms";
@Injectable()
export class BranchService {
  branchChanged = new Subject<Branch[]>();
  private branchs: Branch[];
  private _url: string;
  private options: RequestOptions;

  private brandId: number;
  private brandName: string;


  constructor(private http: Http, private router: Router) {
    this._url = environment.server_url + 'branchs';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }


  fetchAllByBrandId(brandID: number) {
    this.http.post(this._url, brandID, this.options)
      .map(response => response.json()).subscribe(data => {
      this.branchs = data;
      this.branchChanged.next(this.branchs);
      console.log(this.branchs);
    }, error => this.errorHandel(error));
    // this.router.navigate(['/branchs']);
  }


  setBranchs(branchs: Branch[]) {
    this.branchs = branchs;
    this.branchChanged.next(this.branchs);
  }

  getBranchs() {
    let branches: Branch[] = []
    this.branchChanged.subscribe((branchs: Branch[]) => {
      branches = branchs;
    });
    return branches;
  }

  getBranch(id: number) {
    if (!this.branchs) {
      this.branchChanged.subscribe((branchs: Branch[]) => {
        return branchs.find(function (branch) {
          return branch.id == id;
        });
      });
    }
    else {
      return this.branchs.find(function (branch) {
        return branch.id == id;
      });
    }
    // return this.branchs.find(function (branch) {
    //   return branch.id == id;
    // });

  }

  addBranch(branchDTO: BranchDTO) {
    console.log(branchDTO);
    this.http.put(this._url, branchDTO, this.options)
      .map(response => response.json()).subscribe(data => {
      this.branchs.push(data);
      this.branchChanged.next(this.branchs.slice());
      console.log(this.branchs);
    }, error => this.errorHandel(error));
  }

  updateBranch(id: number, newBranch: BranchDTO) {
    this.http.post(`${this._url}/${newBranch.id}`, JSON.stringify(newBranch), this.options)
      .map(response => response.json()).subscribe(data => {
      let index = this.branchs.findIndex(function (branch) {
        return branch.id == id;
      });
      this.branchs[index] = data;
      this.branchChanged.next(this.branchs.slice());
    }, error => this.errorHandel(error));
  }

  updateBranchPwd(newBranch: BranchDTO) {
    this.http.post(`${this._url}/changepwd/${newBranch.id}`, JSON.stringify(newBranch), this.options)
      .map(response => response.json()).subscribe(data => {
      let id = newBranch.id;
      let index = this.branchs.findIndex(function (branch) {
        return branch.id == id;
      });
      this.branchs[index] = data;
      this.branchChanged.next(this.branchs.slice());
    }, error => this.errorHandel(error));
  }

  deleteBranch(branchId: number) {
    this.http.delete(`${this._url}/${branchId}`, this.options).subscribe(response => {
      if (response.ok) {
        let index = this.branchs.findIndex(function (branch) {
          return branch.id == branchId;
        });
        this.branchs.splice(index, 1);
        this.branchChanged.next(this.branchs.slice());
      }
    }, error => this.errorHandel(error));
  }

  // setActiveBrand(brandId:number, brandName:string){
  //     this.brandId = brandId;
  //     this.brandName = brandName;
  //     this.fetchAllByBrandId(this.brandId);
  // }
  setBrandName(brandName: string) {
    this.brandName = brandName;
  }

  setBrandId(brandId: number) {
    this.brandId = brandId;
  }

  getBrandName() {
    return this.brandName;
  }

  getBrandId() {
    return this.brandId;
  }

  assignBranchChildAccount(account: AccountDTO, branchForm: FormGroup) {
    return this.http.post('http://localhost:8080/auth/register', JSON.stringify(account), this.options)
      .map(response => response.json()).subscribe(data => {
        console.log(data);
        let childAccount = new Account(data.username, "", data.id);
        let index = this.branchs.findIndex(function (branch) {
          return branch.id == account.branchId;
        });
        console.log(this.branchs[index]);
        this.branchs[index].accounts.push(childAccount);
        this.branchChanged.next(this.branchs.slice());

        (<FormArray>branchForm.get('accounts')).push(
          new FormGroup({
            'username': new FormControl(account.userName),
            'password': new FormControl('123456')
          })
        );

      }, error => this.errorHandel(error));
  }

  deleteBranchChildAccount(branchId: number, accountId: number, branchForm: FormGroup) {
    this.http.delete(`${this._url}/deletechildaccount/${accountId}`, this.options).subscribe(response => {
      if (response.ok) {
        let index = this.branchs.findIndex(function (branch) {
          return branch.id == branchId;
        });
        let accountIndex = this.branchs[index].accounts.findIndex(function (account) {
          return account.id == accountId;
        });
        this.branchs[index].accounts.splice(accountIndex, 1);
        this.branchChanged.next(this.branchs.slice());
        (<FormArray>branchForm.get('accounts')).removeAt(accountIndex);
      }
    }, error => this.errorHandel(error));
  }

  changeBranchChildPwd(branchId: number, accountId: number, newPwd: string, branchForm: FormGroup) {
    // console.log((<FormArray>branchForm.get('accounts')).controls[accountIndex]);
    this.http.post(`${this._url}/changechildpwd/${accountId}`, this.options)
      .map(response => response.json()).subscribe(data => {
      let index = this.branchs.findIndex(function (branch) {
        return branch.id == branchId;
      });
      let accountIndex = this.branchs[index].accounts.findIndex(function (account) {
        return account.id == accountId;
      });
      (<FormArray>branchForm.get('accounts')).controls[accountIndex].patchValue({"password": newPwd});
      this.branchs[index].accounts[accountIndex] = data;
      this.branchChanged.next(this.branchs.slice());
      console.log(data);
    }, error => this.errorHandel(error));

  }

  errorHandel(error) {
    if (error.status === 403) {
      this.router.navigate(['/signin', {msg: '1'}]);
    }
  }
}
