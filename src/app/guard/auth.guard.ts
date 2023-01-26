import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './../service/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private router: Router
  ) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 

    if (this.configService.token()) {
     // console.log("Guard Token is " + this.configService.getToken());
      return true;

    } else {
      console.log("Expired Login Access!");
      this.router.navigate(['/login/relogin']);
      return false;

    }
  }

}
