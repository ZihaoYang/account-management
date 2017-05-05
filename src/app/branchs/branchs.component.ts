import {Component, OnInit} from "@angular/core";
import {BranchService} from "./branch.service";
import {BrandService} from "../brands/brand.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-branch',
  templateUrl: 'branchs.component.html',
  styleUrls: ['branchs.component.css'],
  providers: [BranchService]
})
export class BranchsComponent implements OnInit {

  constructor(private branchService: BranchService,
              private brandService: BrandService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.brandService.transfer2Branch();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.branchService.fetchAllByBrandId(+params['id']);
          // this.brandService.brandChanged.subscribe((value)=>{
          //
          //   // let brand = value.find(function (brand) {
          //   //   return brand.id == +params['id'];
          //   // });//[+params['id']];
          //   // this.branchService.setBrandId(brand.id);
          //   // this.branchService.setBrandName(brand.name);
          //   // this.branchService.setBranchs(brand.branches);
          // })
        }
      );
  }


}
