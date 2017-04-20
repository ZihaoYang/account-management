export class BrandDTO {
  constructor(public name: string, public salecategory: string,
              public logo: string, public totalAccountNum: number,
              public userName: string, public password?: string, public id?: number) {
  }
}
