import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAdminLoggedIn: any;
  private server = environment.server;

  private adminStatus = new BehaviorSubject<any>(null || localStorage.getItem('adminLogin'));
  public adminStatus$ = this.adminStatus.asObservable();

  constructor(private http: HttpClient, 
    private router: Router) {
  }

  // error handler
  private handleError(error:any, caught:any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }

  // error handler authorize
  private handleErrorAuthorize(error:any, caught:any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }


  // Get admin login form
  getAdminLoginForm(): Observable<any> {
    return this.http
    .get(`${this.server}/api/teacher/signin`)
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // post login admin
  postLogin(body: any): Observable<any> {
    return this.http
    .post(`${this.server}/api/teacher/signin`, body, { /*withCredentials : true*/ })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // get signup form
  getAdminSignupForm(): Observable<any> {
    return this.http
    .get(`${this.server}/api/teacher/signup`)
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // post signup admin
  postSignUp(body: any): Observable<any> {
    return this.http
    .post(`${this.server}/api/teacher/signup`, body)
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // get login status from session storage
  getAdminProfile(): any {
    return this.http
    .get(`${this.server}/api/teacher/profile`)
    .pipe(
      map(res => res),
      catchError(this.handleErrorAuthorize)
    );
  }

  // get refresh token
  getRefreshToken(): any {
    if(localStorage.getItem('refreshToken')){
      return this.http
      .post(`${this.server}/api/teacher/token/refresh`, 
        ({ 
          teacher: localStorage.getItem('admin'),
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
  getAdminLoginStatus(): any  {
    let storedItem:any = localStorage.getItem('adminLogin');

    if(!!storedItem && storedItem != 'false') return true; 
    else return false;
  }

  // logout admin
  logoutAdmin(): Observable<any> {
    return this.http
    .get(`${this.server}/api/teacher/logout`)
    .pipe(
      map(res => {
        localStorage.clear();
        this.isAdminLoggedIn = false;
        this.adminStatus.next(undefined);
        this.router.navigate(['/admin/signin']);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  // set login status to true in local storage
  setAdminLogin(status: any): void {
    this.adminStatus.next(status);
    localStorage.setItem('adminLogin', status);
    this.isAdminLoggedIn = true;
  }
}
