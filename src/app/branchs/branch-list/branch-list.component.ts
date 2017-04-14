import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {Branch} from "../../model/branch.model";
import {BranchService} from "../branch.service";

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  branchs: Branch[];
  totalAccounts = 0;
  subscription: Subscription;

  constructor(private branchService: BranchService,
              private router: Router,
              private route: ActivatedRoute) {
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
    this.branchs = this.branchService.getBranchs();
    for (let branch of this.branchs) {
      this.totalAccounts += branch.accounts.length;
    }
  }

  onNewBranch() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
