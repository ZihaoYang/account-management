import {Component, OnInit} from "@angular/core";
import {BrandService} from "../brand.service";
import {Subscription} from "rxjs";
import {Brand} from "../../model/brand.model";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[];
  subscription: Subscription;

  constructor(private brandService: BrandService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.brandService.brandChanged.subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      }
    );
    this.brands = this.brandService.getBrands();
  }

  onNewBrand() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
