import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../../services/auth/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private customerService: CustomerService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.customerService.getRefreshToken()
    .pipe(map((result:any) => {
        if(!JSON.parse(JSON.stringify(result)).refreshToken){ 
          localStorage.setItem('loginError', "You are not allowed to access this URL. Please login to continue.");
          localStorage.setItem('returnURL', this.router.url);
          this.customerService.logoutCustomer().subscribe((res: any) => res);
          this.router.navigate(['/customer/signin']);
          return false;
        }
        else {          
          localStorage.setItem('refreshTokenMessage', 'Refresh Token was successful.');
          localStorage.setItem('token', 'Bearer ' + JSON.parse(JSON.stringify(result)).refreshToken);
          return true;
        }
    }));
  }
  
}
