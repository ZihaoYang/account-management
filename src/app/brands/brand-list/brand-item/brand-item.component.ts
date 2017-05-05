import {Component, OnInit, Input} from "@angular/core";
import {Brand} from "../../../model/brand.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {
  @Input() brand: Brand;
  @Input() index: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  onClick() {
    //this.branchService.setActiveBrand(this.brand.id, this.brand.adminAccount.username);
    this.router.navigate([this.brand.id, 'branchs'], {relativeTo: this.route});
  }

}
