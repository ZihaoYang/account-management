import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BrandService} from "../brand.service";
import {Brand} from "../../model/brand.model";
import {Account} from "../../model/account.model";

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  id: number;
  editMode = false;
  brandId: number;
  accountId: number;
  brandForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private brandService: BrandService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let name = '';
    let salecategory = '';
    let logo = '';
    let username = '';
    let password = '';
    let totalAccountNum: number;

    if (this.editMode) {
      const brand = this.brandService.getBrand(this.id);
      this.brandId = brand.id;
      this.accountId = brand.adminAcount.id;
      name = brand.name;
      salecategory = brand.salecategory;
      logo = brand.logo;
      username = brand.adminAcount.username;
      password = brand.adminAcount.password;
      totalAccountNum = +brand.totalAccountNum;

    }

    this.brandForm = new FormGroup({
      'brandName': new FormControl(name, Validators.required),
      'category': new FormControl(salecategory, Validators.required),
      'logoPath': new FormControl(logo, Validators.required),
      'account': new FormControl(username, Validators.required),
      'initPassword': new FormControl(password, Validators.required),
      'accountNum': new FormControl(totalAccountNum, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit() {

    const newBrand = new Brand(this.brandId, this.brandForm.value['brandName'],
      this.brandForm.value['category'],
      this.brandForm.value['logoPath'],
      this.brandForm.value['accountNum'],
      new Account(this.accountId, this.brandForm.value['account'],
        this.brandForm.value['initPassword']));


    if (this.editMode) {
      this.brandService.updateBrand(this.id, newBrand);
    }
    else {
      this.brandService.addBrand(newBrand);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
