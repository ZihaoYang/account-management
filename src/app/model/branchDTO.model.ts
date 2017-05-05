export class BranchDTO {
  constructor(public name: string, public address: string,
              public cityCode: number, public dealerId: number, public id?: number,
              public userName?: string, public password?: string, public accountId?: number) {
  }
}
