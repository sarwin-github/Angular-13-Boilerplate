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
export class CustomerService {
  private isCustomerLoggedIn: any;

  // private server = environment.server;
  server = environment.server;
  userURL = `${this.server}/api/student`;

  private customerStatus = new BehaviorSubject<any>(null || localStorage.getItem('customerLogin'));
  public customerStatus$ = this.customerStatus.asObservable();

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
    private router: Router) {
  }

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

  // Get customer login form
  getCustomerLoginForm(): Observable<any> {
    return this.http
      .get(`${this.userURL}/signin`)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  // post login customer
  postLogin(body: any): Observable<any> {
    return this.baseService.post(`${this.userURL}/signin`, body)
      // return this.http.post(`${this.userURL}/signin`, body, { /*withCredentials : true*/ })
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  // get signup form
  getCustomerSignupForm(): Observable<any> {
    return this.http
      .get(`${this.userURL}/signup`)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  // post signup customer
  postSignUp(body: any): Observable<any> {
    // return this.http.post(`${this.userURL}/signup`, body)
    return this.baseService.post(`${this.userURL}/signup`, body)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  // get login status from session storage
  getCustomerProfile(): any {
    return this.http
      .get(`${this.userURL}/profile`)
      .pipe(
        map(res => res),
        catchError(this.handleErrorAuthorize)
      );
  }

  // get refresh token
  getRefreshToken(): any {
    if (localStorage.getItem('refreshToken')) {
      return this.http
        .post(`${this.userURL}/token/refresh`,
          ({
            student: localStorage.getItem('customer'),
            refreshToken: localStorage.getItem('refreshToken')
          })
        )
        .pipe(
          map(res => res),
          catchError(this.handleErrorAuthorize)
        );
    } else return of(false);

  }

  // get login status from session storage
  getCustomerLoginStatus(): any {
    let storedItem: any = localStorage.getItem('customerLogin');

    if (!!storedItem && storedItem != 'false') return true;
    else return false;
  }

  // logout customer
  logoutCustomer(): Observable<any> {
    return this.http
      .get(`${this.userURL}/logout`)
      .pipe(
        map(res => {
          localStorage.clear();
          this.isCustomerLoggedIn = false;
          this.customerStatus.next(undefined);
          this.router.navigate(['./account/login']);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // set login status to true in local storage
  setCustomerLogin(status: any): void {
    this.customerStatus.next(status);
    localStorage.setItem('customerLogin', status);
    this.isCustomerLoggedIn = true;
  }
}
