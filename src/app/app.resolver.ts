import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AppResolver implements Resolve<any> {
  constructor(
      public authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if(this.authService.authenticated()) {
        return 
    }
    this.authService.login();
  }
}
