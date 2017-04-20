import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-branch-empty',
  templateUrl: './branch-empty.component.html',
  styleUrls: ['./branch-empty.component.css']
})
export class BranchEmptyComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onNewBranch() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
