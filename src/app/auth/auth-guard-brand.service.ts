import {RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate} from "@angular/router";
import {AccountService} from "./account.service";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthGuardBrand implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    // Navigate to the login page with extras
    if (this.accountService.checkDealerLogin()) {
      return true;
    } else {
      if (this.accountService.isLoggedIn) {
        this.router.navigateByUrl('/page-not-found');
      } else {
        this.router.navigateByUrl('/signin');
      }

      return false;
    }
  }
}
