import * as AppState from '@main/app.state';
import { createReducer, on } from '@ngrx/store';
import * as Model from '../customer.model';
import { 
  AllCustomerActionTypes,
  CustomerAction 
} from './customer.actions';
export interface State extends AppState.State {
  customer: CustomerState;
}

export interface CustomerState {
  selected: Model.Customer;
  error: any;
  success: boolean,
  succesMsg: '',
  loading: boolean;
}

const initialState: CustomerState = {
  selected: {
    _id: '',
    address: '',
    email: '',
    name: '',
    phone: null,
    password: null
  },
  success: false,
  succesMsg: '',
  error: null,
  loading: false,
};

/*export const CustomerReducer = createReducer<CustomerState>(
  initialState,
  on(AllCustomerActionTypes.GET_USER_CUSTOMER, (state): CustomerState => {
    return {
      ...state,
      loading: true
    };
  }),
  on(AllCustomerActionTypes.GET_USER_CUSTOMER_SUCCESS, (state, action: any): CustomerState => {

    console.log(action?.customer)
    return {
      ...state,
      loading: false,
      selected: action?.customer
    };
  }),
  on(AllCustomerActionTypes.GET_USER_CUSTOMER_FAIL, (state, action): CustomerState => {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }),
);*/


export const CustomerReducer = (
  state: CustomerState = initialState,
  action: CustomerAction,
  ): CustomerState => {


    switch (action.type){
      // get customer profile
      case AllCustomerActionTypes.GET_USER_CUSTOMER:
      return { ...state, success: false, error: null };

      case AllCustomerActionTypes.GET_USER_CUSTOMER_SUCCESS:
      return { ...state,  selected: action.payload, success: true };
      
      case AllCustomerActionTypes.GET_USER_CUSTOMER_FAIL:
      return { ...state, success: false, error: action.payload };
    }
  }