import {Subject} from "rxjs/Subject";
import {Brand} from "../model/brand.model";
import {Account} from "../model/account.model";
export class BrandService {
  brandChanged = new Subject<Brand[]>();
  private brands: Brand[] = [
    new Brand(1001, '东鹏瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 10,
      new Account(1, 'Dongpeng', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    ),
    new Brand(1002, '马可波罗瓷砖',
      '瓷砖',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/240px-Recipe_logo.jpeg', 20,
      new Account(2, 'Makeboluo', "123456")
    )
  ];

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

  addBrand(brand: Brand) {
    this.brands.push(brand);
    this.brandChanged.next(this.brands.slice());
  }

  updateBrand(index: number, newBrand: Brand) {
    this.brands[index] = newBrand;
    this.brandChanged.next(this.brands.slice());
  }

  deleteBrand(index: number) {
    this.brands.splice(index, 1);
    this.brandChanged.next(this.brands.slice());
  }
}
