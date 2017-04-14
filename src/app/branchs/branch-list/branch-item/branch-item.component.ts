import {Component, OnInit, Input} from "@angular/core";
import {Branch} from "../../../model/branch.model";

@Component({
  selector: 'app-branch-item',
  templateUrl: './branch-item.component.html',
  styleUrls: ['./branch-item.component.css']
})
export class BranchItemComponent implements OnInit {
  @Input() branch: Branch;
  @Input() index: number;
  constructor() {
  }

  ngOnInit() {
  }

}
