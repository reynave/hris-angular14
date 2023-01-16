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
    // console.log('token : '+this.configService.token());
   // console.log(this.configService.accessRightGet());

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   

    if (this.configService.token()) {
        console.log("Guard token : "+this.configService.token());
        return true;
     
    } else {
      console.log("Relogin please!");
      this.router.navigate(['/relogin']); 
      return false;

    }
  }

}
