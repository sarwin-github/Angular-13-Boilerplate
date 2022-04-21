import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from './customer.reducer';

const getCustomerInitState = createFeatureSelector<CustomerState>('customer');

export const loading = createSelector (
  getCustomerInitState,
  state => state.loading
);

export const getCustomerProfile = createSelector (
  getCustomerInitState,
  state => state.selected
);

