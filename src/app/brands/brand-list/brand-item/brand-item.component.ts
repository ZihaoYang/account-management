import {Component, OnInit, Input} from "@angular/core";
import {Brand} from "../../../model/brand.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchService} from "../../../branchs/branch.service";

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {
  @Input() brand: Brand;
  @Input() index: number;

  constructor(private route: ActivatedRoute,
              private branchService: BranchService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onClick(brandId) {
    console.log(brandId);
    this.branchService.fetchAllByBrandId(brandId);
  }

}
