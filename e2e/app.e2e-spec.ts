import {AccountManagementPage} from "./app.po";

describe('account-management App', () => {
  let page: AccountManagementPage;

  beforeEach(() => {
    page = new AccountManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
