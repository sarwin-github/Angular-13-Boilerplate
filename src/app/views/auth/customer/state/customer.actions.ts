import { Action } from '@ngrx/store';
import {
  createAction,
  props
} from "@ngrx/store";
import * as Model from '../customer.model';

export const enum AllCustomerActionTypes {
  GET_USER_CUSTOMER = '[Customer] - Get User: Customer',
  GET_USER_CUSTOMER_SUCCESS = '[Customer] - Get User: Customer Success',
  GET_USER_CUSTOMER_FAIL = '[Customer] - Get User: Customer Fail',

}

export class GetUserCustomer implements Action {
  public readonly type = AllCustomerActionTypes.GET_USER_CUSTOMER;
  constructor(public payload: any) { }
}

export class GetUserCustomerSuccess implements Action {
  public readonly type = AllCustomerActionTypes.GET_USER_CUSTOMER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetUserCustomerFail implements Action {
  public readonly type = AllCustomerActionTypes.GET_USER_CUSTOMER_FAIL;
  constructor(public payload: any) { }
}

export type CustomerAction =
GetUserCustomer |
GetUserCustomerSuccess |
GetUserCustomerFail;


