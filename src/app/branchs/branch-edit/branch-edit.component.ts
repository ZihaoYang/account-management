import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BranchService} from "../branch.service";
import {MitCitySelectService} from "../../mit-city-select/mit-city-select.service";
import {Branch} from "../../model/branch.model";
import {IMitNode} from "../../mit-city-select/mit-city-node.model";

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit, OnDestroy {
  avaliableAccounts = 0;
  citylist: Array<any>;

  id: number;
  branchId: number;
  accountId: number;
  branchForm: FormGroup;
  cityCode: string;
  district: IMitNode;
  city: IMitNode;
  province: IMitNode;

  name = '';
  address = '';
  accounts = new FormArray([]);

  citySelect(e) {
    this.cityCode = e;
  }

  constructor(private route: ActivatedRoute,
              private branchService: BranchService,
              private mitCitySelectService: MitCitySelectService,
              private router: Router) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.avaliableAccounts = 20;
          this.district = new IMitNode(null, null, null);
          this.city = new IMitNode(null, null, null);
          this.province = new IMitNode(null, null, null);
          this.initForm();
        }
      );
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
    const branch = this.branchService.getBranch(this.id);
    this.branchId = branch.id;
    this.name = branch.name;
    this.address = branch.address;
    this.cityCode = '' + branch.cityCode;
    if (branch['accounts']) {
      for (let account of branch.accounts) {
        this.accounts.push(
          new FormGroup({
            'id': new FormControl(account.id),
            'username': new FormControl(account.username, Validators.required),
            'password': new FormControl(account.password, [
              Validators.required
            ]),
          })
        );
      }
      // console.log(this.accounts);
    }

    this.branchForm = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'address': new FormControl(this.address, Validators.required),
      'accounts': this.accounts
    });

    this.mitCitySelectService.getAddress().subscribe((res) => {
      this.citylist = res;
      this.setDistrict(this.citylist, this.cityCode);
    });

  }

  onSubmit() {
    const newBranch = new Branch(
      this.id,
      this.branchForm.value['name'],
      this.branchForm.value['address'],
      +this.cityCode,
      this.branchForm.value['accounts']
    );

    console.log(newBranch);

    this.branchService.updateBranch(this.id, newBranch);

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteAccount(index: number) {
    (<FormArray>this.branchForm.get('accounts')).removeAt(index);
  }

  onDeleteBranch() {
    this.branchService.deleteBranch(this.id);
    this.onCancel();
  }


  onAssignAccount() {
    (<FormArray>this.branchForm.get('accounts')).push(
      new FormGroup({
        'id': new FormControl(123456),
        'username': new FormControl('test'),
        'password': new FormControl('123456')
      })
    );
  }

  ngOnDestroy() {
    this.onSubmit();
  }
}
