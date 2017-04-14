import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchService} from "../branch.service";
import {Branch} from "../../model/branch.model";

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

  constructor(private route: ActivatedRoute,
              private branchService: BranchService,
              private router: Router) {
  }

  citySelect(e) {
    this.cityCode = e;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let address = '';
    let cityCode = '';

    this.branchForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'address': new FormControl(address, Validators.required)
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

    const newBranch = new Branch(this.branchId, this.branchForm.value['name'],
      this.branchForm.value['address'],
      this.cityCode,
      []);
    console.log(newBranch);
    this.branchService.addBranch(newBranch);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
