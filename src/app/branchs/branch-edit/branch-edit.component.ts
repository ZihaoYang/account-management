import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BranchService} from "../branch.service";
import {MitCitySelectService} from "../../mit-city-select/mit-city-select.service";
import {Branch} from "../../model/branch.model";
import {IMitNode} from "../../mit-city-select/mit-city-node.model";
import {BranchDTO} from "../../model/branchDTO.model";
import {UtilityService} from "../../share/utility.service";
import {AccountDTO} from "../../model/accountDTO.model";

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {
  avaliableAccounts = 0;
  citylist: Array<any>;

  // id: number;
  branchId: number;
  // accountId: number;
  branchForm: FormGroup;
  cityCode: string;
  district: IMitNode;
  city: IMitNode;
  province: IMitNode;

  name = '';
  address = '';
  accounts = new FormArray([]);
  branch: Branch;

  citySelect(e) {
    this.cityCode = e;
  }

  constructor(private route: ActivatedRoute,
              private branchService: BranchService,
              private mitCitySelectService: MitCitySelectService,
              private utilityService: UtilityService,
              private router: Router) {
  }

  ngOnInit() {
    this.branchForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'address': new FormControl("", Validators.required),
      'username': new FormControl(""),
      'password': new FormControl(""),
      'accounts': this.accounts
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.branchId = +params['branchid'];
          this.avaliableAccounts = 20;
          this.district = new IMitNode(null, null, null);
          this.city = new IMitNode(null, null, null);
          this.province = new IMitNode(null, null, null);
          this.branch = this.branchService.getBranch(+params['branchid']);
          if (this.branch == undefined) {
            this.branchService.branchChanged.subscribe((value) => {
              this.branch = value.find(function (branch) {
                return branch.id == +params['branchid'];
              });
              this.initForm();
            });
          }
          else {
            this.initForm();
          }
        }
      );


    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.branchId = +params['branchid'];
    //       this.avaliableAccounts = 20;
    //       this.district = new IMitNode(null, null, null);
    //       this.city = new IMitNode(null, null, null);
    //       this.province = new IMitNode(null, null, null);
    //       this.branch = this.branchService.getBranch(this.branchId);
    //       // if(this.branch == undefined){
    //       //   this.branchService.branchChanged.subscribe((branch))
    //       // }
    //       this.initForm();
    //     }
    //   );
    // });
  }

  setDistrict(citylist: any[], districtCode: string) {
    let provinceCode = districtCode.substring(0, 2) + '0000';
    let cityCode = districtCode.substring(0, 4) + '00';

    for (let item of citylist) {
      if (item.value === districtCode) {
        this.district.name = item.name;
        this.district.value = item.value;
      }
      else if (item.value === cityCode) {
        this.city.name = item.name;
        this.city.value = item.value;
      }
      else if (item.value === provinceCode) {
        this.province.name = item.name;
        this.province.value = item.value;
      }
    }
  }

  private initForm() {
    const branch = this.branch;
    this.branchId = branch.id;
    this.name = branch.name;
    this.address = branch.address;
    this.cityCode = '' + branch.cityCode;
    let username = branch.branchAccount.username;
    let password = branch.branchAccount.password;
    if (branch['accounts']) {
      for (let account of branch.accounts) {
        let formGroup = new FormGroup({
          'username': new FormControl(account.username, Validators.required),
          'password': new FormControl(account.password, [Validators.required]),
        });
        this.accounts.push(
          formGroup
        );
      }
    }
    this.branchForm = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'address': new FormControl(this.address, Validators.required),
      'username': new FormControl(username),
      'password': new FormControl(password),
      'accounts': this.accounts
    });

    this.mitCitySelectService.getAddress().subscribe((res) => {
      this.citylist = res;
      this.setDistrict(this.citylist, this.cityCode);
    });
  }

  onSubmit() {
    let name = this.branchForm.value['name'];
    let address = this.branchForm.value['address'];
    let brandId = +this.branchService.getBrandId();
    let newBranch = new BranchDTO(name,
      address,
      +this.cityCode, brandId, this.branchId);
    console.log(newBranch);
    this.branchService.updateBranch(this.branchId, newBranch);

    this.onCancel();
  }

  onChangePwd() {
    let newPwd = "" + Math.floor(100000 + Math.random() * 900000);
    // let branchId = this.branch.branchAccount.id;
    let newBranch = new BranchDTO(this.branch.name,
      this.branch.address,
      +this.cityCode,
      +this.branchService.getBrandId(),
      this.branchId, this.branch.branchAccount.username,
      newPwd,
      this.branch.branchAccount.id);
    this.branchForm.controls['password'].setValue(newPwd);
    console.log(newBranch);
    this.branchService.updateBranchPwd(newBranch);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteAccount(accountId: number) {
    // (<FormArray>this.branchForm.get('accounts')).removeAt(index);
    // let account = this.branch.accounts[index];
    this.branchService.deleteBranchChildAccount(this.branchId, accountId, this.branchForm);
    // console.log(account);
  }

  onDeleteBranch() {
    this.branchService.deleteBranch(this.branch.id);
    this.onCancel();
  }


  onAssignAccount() {
    let accountName = "";
    let accountPwd = "123456";
    if (this.branch.accounts.length == 0) {
      accountName = this.branch.branchAccount.username + 'A';
    }
    else {
      let lastUsername = this.branch.accounts[this.branch.accounts.length - 1].username;
      let suffix = lastUsername.substr(this.branch.branchAccount.username.length);
      let newSuffix = this.utilityService.nextChar(suffix);
      accountName = this.branch.branchAccount.username + "" + newSuffix;
    }
    let newChildAccount = new AccountDTO(accountName, accountPwd, this.branch.id);
    console.log(newChildAccount);
    this.branchService.assignBranchChildAccount(newChildAccount, this.branchForm);
  }

  onClickResetBtn(accountid: number, event) {
    let cmdname = event.target.innerText;
    // this.branchForm.get('accounts').get(""+index).setValue()
    if (cmdname == "重置密码") {
      // let accountid = this.branch.accounts[index].id;
      // let username = this.branch.accounts[index].username;
      let newpwd = "" + Math.floor(100000 + Math.random() * 900000);
      this.branchService.changeBranchChildPwd(this.branch.id, accountid, newpwd, this.branchForm);

    }
  }


  // ngOnDestroy() {
  //   if (!this.deleteMode) {
  //     this.onSubmit();
  //   }
  // }
}
