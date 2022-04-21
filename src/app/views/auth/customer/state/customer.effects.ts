import { Injectable } from '@angular/core';
import { State } from '@ngrx/store';
import { 
  Observable, 
  of, 
  Subscription 
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';
import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';
import { 
  AllCustomerActionTypes,
  CustomerAction 
} from './customer.actions';
import { CustomerUserService } from './customer.service';

@Injectable()
export class CustomerEffects {

  constructor(
    private customerUserService: CustomerUserService,
    private actions$: Actions,
  ) { }

  public getCustomerProfile$ = createEffect(() =>
     this.actions$.pipe(
       // set type
       ofType(AllCustomerActionTypes.GET_USER_CUSTOMER),
       // switch to a new observable and cancel previous subscription
       switchMap(() => {
         return this.customerUserService.getCustomerProfile()
           .pipe(
             // return payload
             map((result: any) => {
               return {
                 type: AllCustomerActionTypes.GET_USER_CUSTOMER_SUCCESS,
                 payload: result
               };
             }),
             catchError((error: any) =>
               // error handler
               of({
                 type: AllCustomerActionTypes.GET_USER_CUSTOMER_FAIL,
                 payload: error
               }),
             ),
           );
       }),
     ),
   )
}
