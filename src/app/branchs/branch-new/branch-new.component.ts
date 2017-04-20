import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchService} from "../branch.service";
import {Branch} from "../../model/branch.model";
import {MdDialog} from "@angular/material";
import {IMitNode} from "../../mit-city-select/mit-city-node.model";

@Component({
  selector: 'app-branch-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.css']
})
export class BranchNewComponent implements OnInit {

  id: number;
  branchId: number;
  accountId: number;
  branchForm: FormGroup;
  cityCode: number;

  district: IMitNode;
  city: IMitNode;
  province: IMitNode;

  constructor(private route: ActivatedRoute,
              private branchService: BranchService,
              private router: Router,
              public dialog: MdDialog) {
  }

  citySelect(e) {
    this.cityCode = e;
  }

  ngOnInit() {
    this.district = new IMitNode(null, null, null);
    this.city = new IMitNode(null, null, null);
    this.province = new IMitNode(null, null, null);
    this.initForm();
  }

  private initForm() {
    let name = '';
    let address = '';
    let cityCode = '';
    let username = '';
    // if(this.branchService.getBranchs().length == 0){
    //   username =
    // }
    let password = '123456';

    this.branchForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'address': new FormControl(address, Validators.required),
      'username': new FormControl(username),
      'password': new FormControl(password)
    });


    // this.brandForm = new FormGroup({
    //   'brandName': new FormControl(name, Validators.required),
    //   'category': new FormControl(salecategory, Validators.required),
    //   'logoPath': new FormControl(logo, Validators.required),
    //   'account': new FormControl(username, Validators.required),
    //   'initPassword': new FormControl(password, Validators.required),
    //   'accountNum': new FormControl(totalAccountNum, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    // });
  }

  onSubmit() {
    const newBranch = new Branch(this.branchForm.value['name'],
      this.branchForm.value['address'],
      this.cityCode,
      [], this.branchId);
    console.log(newBranch);
    this.branchService.addBranch(newBranch);
    // let dialogRef = this.dialog.open(ToasterComponent,{
    //           disableClose: true
    //         });
    // dialogRef.componentInstance.toaster = "新增成功！";
    //   setTimeout(() => {
    //     dialogRef.close();
    //   }, 2000);

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
