import {Subject} from "rxjs/Subject";
import {Brand} from "../model/brand.model";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {BrandDTO} from "../model/brandDTO.model";
@Injectable()
export class BrandService {
  brandChanged = new Subject<Brand[]>();
  // private brands: Brand[] = [
  //   new Brand('东鹏瓷砖',
  //     '瓷砖',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg',10,
  //     new Account('Dongpeng', "123456",1),1001
  //   ),
  //   new Brand( '马可波罗瓷砖',
  //     '瓷砖',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
  //     new Account('Makeboluo', "123456",2),1002
  //   ),
  //   new Brand('马可波罗瓷砖',
  //     '瓷砖',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
  //     new Account('Makeboluo', "123456",3),1003
  //   )
  // ];

  private brands: Brand[] = [];
  private _url: string;
  private options;
  //
  constructor(private http: Http, private router: Router) {
    this._url = environment.server_url + 'brands';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
    this.fetchAll();
  }

  fetchAll() {
    this.http.get(this._url, this.options)
      .map((response: Response) => response.json()).subscribe(data => {
      this.brands = data;
      console.log(this.brands);
      this.brandChanged.next(this.brands.slice());
    }, error => this.errorHandel(error));
  }

  setBrands(brands: Brand[]) {
    this.brands = brands;
    this.brandChanged.next(this.brands.slice());
  }

  getBrands() {
    return this.brands.slice();
  }

  getBrand(index: number) {
    return this.brands[index];
  }

  addBrand(registerAdminDTO: BrandDTO) {
    // let registerAdminDTO = '{"name":"'+ brand.name
    //   +'","salecategory":"'+brand.salecategory
    //   +'","logo":"'+brand.logo
    //   +'","totalAccountNum":"'+brand.totalAccountNum
    //   +'","userName":"'+brand.adminAccount.username
    //   +'","password":"'+brand.adminAccount.password +'"}';
    console.log(registerAdminDTO);
    this.http.put(this._url, registerAdminDTO, this.options)
      .map(response => response.json()).subscribe(data => {
      this.brands.push(data);
      this.brandChanged.next(this.brands.slice());
    }, error => this.errorHandel(error));
  }

  updateBrand(index: number, newBrand: BrandDTO) {
    // console.log(newBrand);
    this.http.post(`${this._url}/${newBrand.id}`, JSON.stringify(newBrand), this.options)
      .map(response => response.json()).subscribe(data => {
      this.brands[index] = data;
      this.brandChanged.next(this.brands.slice());
    }, error => this.errorHandel(error));


  }

  deleteBrand(index: number) {
    this.brands.splice(index, 1);
    console.log(this.brands);
    this.brandChanged.next(this.brands.slice());
  }

  errorHandel(error) {
    if (error.status === 403) {
      this.router.navigate(['/signin', {msg: '1'}]);
    }
  }
}
