import { Injectable } from "@angular/core";
import { State } from './customer.reducer';
import { select, Store } from "@ngrx/store";
import { AllCustomerActionTypes } from './customer.actions';
import * as fromCustomer from './customer.selector';

@Injectable()
export class CustomerFacade {
    loading$ = this.store.pipe(select(fromCustomer.loading));
    customerProfile$ = this.store.pipe(select(fromCustomer.getCustomerProfile));

    constructor(
      private store: Store<State>,
      ) { }

    getCustomerProfile() {
      this.store.dispatch({ type: AllCustomerActionTypes.GET_USER_CUSTOMER });
    }
}
