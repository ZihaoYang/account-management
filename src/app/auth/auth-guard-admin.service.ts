import {RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AccountService} from "./account.service";
@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    // Navigate to the login page with extras
    if (this.accountService.checkBugeLogin()) {
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
