import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BrandService} from "../brand.service";
import {BrandDTO} from "../../model/brandDTO.model";
import {Brand} from "../../model/brand.model";

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  // brandId: number;
  brand: Brand;
  accountId: number;
  brandForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private brandService: BrandService,
              private router: Router) {
  }

  ngOnInit() {
    this.brandForm = new FormGroup({
      'brandName': new FormControl("", Validators.required),
      'category': new FormControl("", Validators.required),
      'logoPath': new FormControl("", Validators.required),
      'account': new FormControl("", Validators.required),
      'initPassword': new FormControl(""),
      'accountNum': new FormControl("", [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    this.route.params
      .subscribe(
        (params: Params) => {
          this.brand = this.brandService.getBrand(+params['id']);
          if (this.brand == undefined) {
            this.brandService.brandChanged.subscribe((value) => {
              this.brand = value.find(function (brand) {
                return brand.id == +params['id'];
              });
              if (this.brand != undefined) {
                this.initForm();
              }
              else {
                this.router.navigateByUrl('/page-not-found');
              }
            });
          }
          else {
            this.initForm();
          }
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

    // const brand = this.brandService.getBrand(this.brandId);
    // brandId = brand.id;
    this.accountId = this.brand.adminAccount.id;
    name = this.brand.name;
    salecategory = this.brand.salecategory;
    logo = this.brand.logo;
    username = this.brand.adminAccount.username;
    password = this.brand.adminAccount.password;
    totalAccountNum = +this.brand.totalAccountNum;


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
      this.brand.id
    );

    this.brandService.updateBrand(this.brand.id, newBrand);


    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDelete() {
    // console.log(this.id);
    this.brandService.deleteBrand(this.brand.id, this.brand.id);
    this.onCancel();
  }


}
