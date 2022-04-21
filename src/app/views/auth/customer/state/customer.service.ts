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
export class CustomerUserService {
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


  // get login status from session storage
  getCustomerProfile(): Observable<any> {
    return this.http
      .get(`${this.userURL}/profile`)
      .pipe(
        map((res: any) => res?.student),
        catchError(this.handleErrorAuthorize)
      );
  }

}
