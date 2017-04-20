import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BrandService} from "../brand.service";
import {BrandDTO} from "../../model/brandDTO.model";

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  deleteMode = false;
  id: number;
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

    const brand = this.brandService.getBrand(this.id);
    this.brandId = brand.id;
    this.accountId = brand.adminAccount.id;
    name = brand.name;
    salecategory = brand.salecategory;
    logo = brand.logo;
    username = brand.adminAccount.username;
    password = brand.adminAccount.password;
    totalAccountNum = +brand.totalAccountNum;


    this.brandForm = new FormGroup({
      'brandName': new FormControl(name, Validators.required),
      'category': new FormControl(salecategory, Validators.required),
      'logoPath': new FormControl(logo, Validators.required),
      'account': new FormControl(username, Validators.required),
      'initPassword': new FormControl(password),
      'accountNum': new FormControl(totalAccountNum, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit() {
    const newBrand = new BrandDTO(this.brandForm.value['brandName'],
      this.brandForm.value['category'],
      this.brandForm.value['logoPath'],
      this.brandForm.value['accountNum'],
      this.brandForm.value['account'],
      this.brandForm.value['initPassword'],
      this.brandId
    );

    // console.log("submit");

    this.brandService.updateBrand(this.id, newBrand);


    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDelete() {
    console.log(this.id);
    this.brandService.deleteBrand(this.id);
    this.deleteMode = true;
    this.onCancel();
  }


}
