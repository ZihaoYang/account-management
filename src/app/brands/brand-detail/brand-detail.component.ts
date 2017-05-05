import {Component, OnInit} from "@angular/core";
import {Brand} from "../../model/brand.model";
import {BrandService} from "../brand.service";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  brand: Brand;
  id: number;

  constructor(private brandService: BrandService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.brand = this.brandService.getBrand(this.id);
    });
  }

  onEditBrand() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteBrand() {
    this.brandService.deleteBrand(this.id, this.brand.id);
    this.onBackBrand();
  }

  onBackBrand() {
    this.router.navigate(['/brands']);
  }

}

