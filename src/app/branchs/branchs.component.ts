import {Component, OnInit} from "@angular/core";
import {BranchService} from "./branch.service";

@Component({
  selector: 'app-branch',
  templateUrl: 'branchs.component.html',
  styleUrls: ['branchs.component.css'],
  providers: [BranchService]
})
export class BranchsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


}
