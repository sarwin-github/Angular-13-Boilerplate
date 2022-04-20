import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BaseService } from "@main/core/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // private server = environment.server;
  server = environment.api_url;
  checkoutURL = `${this.server}/api/checkout`;
  cartURL = `${this.server}/api/cart`;

  constructor(
    private baseService: BaseService,
    private router: Router
  ) { }

  // error handler
  private handleError(error: any, caught: any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }

  // error handler authorize
  private handleErrorAuthorize(error: any, caught: any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }

  getCheckoutItems(): Observable<any> {
    const checkoutId = localStorage.getItem('checkoutId');
    return this.baseService.get(`${this.checkoutURL}/get?id=${checkoutId}`)
      .pipe(
        map((res: any) => res.data),
        catchError(this.handleError)
      );
  }

  removeItemInCart(checkoutId: string, variantId: string) {
    const body = {
      checkoutId,
      variantId
    }
    return this.baseService.post(`${this.cartURL}/delete`, body)
      .pipe(
        map((res: any) => res.data),
        catchError(this.handleError)
      );
  }

  updateItemInCart(checkoutId: string, variantId: string, quantity: number) {
    const body = {
      checkoutId,
      variantId,
      quantity
    };
    return this.baseService.post(`${this.cartURL}/update`, body)
      .pipe(
        map((res: any) => res.data),
        catchError(this.handleError)
      );
  }
}
