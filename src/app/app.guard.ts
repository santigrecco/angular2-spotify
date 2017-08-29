/**
 * Created by leopoldo.barrau on 6/26/2017.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) {
    if (!this.authService.authenticated()) {
      this.authService.login();
      return false;
    }
    return true;
  }

}