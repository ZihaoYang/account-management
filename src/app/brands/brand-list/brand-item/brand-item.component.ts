import {Component, OnInit, Input} from "@angular/core";
import {Brand} from "../../../model/brand.model";

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {
  @Input() brand: Brand;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
