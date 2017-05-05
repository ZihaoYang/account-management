import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../../model/account.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let userName = '';
    let password = '';

    this.loginForm = new FormGroup({
      'userName': new FormControl(userName, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  onSubmit() {
    const account = new Account(
      this.loginForm.value['userName'],
      this.loginForm.value['password']
    );

    console.log(account);
    this.accountService.authenticate(account, isSuccess => {
      if (isSuccess) {
        console.log('success: ' + sessionStorage.getItem('user'));
        // console.log(sessionStorage.getItem('user').roles)
        this.router.navigate(['brands']);
      }
      else {
        console.log('failed');
      }
    });

    // this.branchService.updateBranch(this.id, newBranch);
    //
    // this.onCancel();
  }

}
