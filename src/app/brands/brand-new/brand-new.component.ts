import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BrandService} from "../brand.service";
import {ToasterComponent} from "../../share/toaster/toaster.component";
import {MdDialog} from "@angular/material";
import {BrandDTO} from "../../model/brandDTO.model";

@Component({
  selector: 'app-brand-new',
  templateUrl: './brand-new.component.html',
  styleUrls: ['./brand-new.component.css']
})
export class BrandNewComponent implements OnInit {
  brandId: number;
  accountId: number;
  brandForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private brandService: BrandService,
              private router: Router,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let salecategory = '';
    let logo = '';
    let username = '';
    let password = '';
    let totalAccountNum: number;

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
    const newBrand = new BrandDTO(this.brandForm.value['brandName'],
      this.brandForm.value['category'],
      this.brandForm.value['logoPath'],
      this.brandForm.value['accountNum'],
      this.brandForm.value['account'],
      this.brandForm.value['initPassword']);

    this.brandService.addBrand(newBrand);
    let dialogRef = this.dialog.open(ToasterComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.toaster = "新增成功！";
    setTimeout(() => {
      dialogRef.close();
      this.onCancel();
    }, 2000);

  }

  onCancel() {
    this.router.navigate(['./'], {relativeTo: this.route});
  }

}
