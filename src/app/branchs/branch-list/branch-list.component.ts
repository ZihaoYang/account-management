import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {Branch} from "../../model/branch.model";
import {BranchService} from "../branch.service";
import {MdDialog} from "@angular/material";
import {DialogResultExampleDialog} from "../../share/dialog-result-example-dialog";

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  branchs: Branch[];
  totalAccounts = 0;
  subscription: Subscription;

  selectedOption: string;


  constructor(private branchService: BranchService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.subscription = this.branchService.branchChanged.subscribe(
      (branchs: Branch[]) => {
        this.branchs = branchs;
        for (let branch of branchs) {
          this.totalAccounts += branch.accounts.length;
        }
      }
    );
  }

  onNewBranch() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    // let config = new MdDialogConfig();
    let dialogRef = this.dialog.open(DialogResultExampleDialog, {
      disableClose: true
    });
    dialogRef.componentInstance.test = "test";
    // setTimeout(() => {
    //   dialogRef.close();
    // }, 3000);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}
