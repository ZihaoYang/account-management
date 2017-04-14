import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MitCitySelectService} from "./mit-city-select.service";
import {IMitNode} from "./mit-city-node.model";
@Component({
  selector: 'app-mit-city-select',
  templateUrl: 'mit-city-select.component.html',
  styleUrls: ['mit-city-select.component.css']
})
export class MitCitySelectComponent implements OnInit {
  @Output() result = new EventEmitter();
  @Input() provinceselected: IMitNode;
  @Input() cityselected: IMitNode;
  @Input() districtselected: IMitNode;
  public isProvinceExpand: Boolean = false;
  public isCityExpand: Boolean = false;
  public isDistrictExpand: Boolean = false;
  public list: Array<any>;

  constructor(private mitCitySelectService: MitCitySelectService) {
  }

  ngOnInit() {
    this.mitCitySelectService.getAddress().subscribe((res) => {
      this.list = res;
    });
  }

  selectProvinceHandle(province: string, provinceId: string) {
    this.isProvinceExpand = false;
    this.isCityExpand = false;
    this.isDistrictExpand = false;
    this.provinceselected.name = province;
    this.provinceselected.value = provinceId;
    this.cityselected.name = null;
    this.cityselected.value = null;
    this.districtselected.name = null;
    this.districtselected.value = null;
    this.result.emit(provinceId);
  }

  selectCityHandle(city: string, cityId: string) {
    this.isProvinceExpand = false;
    this.isCityExpand = false;
    this.isDistrictExpand = false;
    this.cityselected.name = city;
    this.cityselected.value = cityId;
    this.districtselected.name = null;
    this.districtselected.value = null;
    this.result.emit(cityId);
  }

  selectDistrictHandle(district: string, districtId: string) {
    this.isProvinceExpand = false;
    this.isCityExpand = false;
    this.isDistrictExpand = false;
    this.districtselected.name = district;
    this.districtselected.value = districtId;
    this.result.emit(districtId);
  }

}
