import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../../../environments/environment';
import { CustomersRoutes } from './customer.routing';
import { CustomerSigninComponent } from './customer-signin/customer-signin.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { SharedModule } from '../../../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialComponentsModule } from '../../../shared/components/material-components/material-components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomerEffects } from './state/customer.effects';
import { CustomerReducer } from './state/customer.reducer';
import { CustomerFacade } from './state/customer.facade';

const components = [
  CustomerSigninComponent,
  CustomerSignupComponent,
  CustomerProfileComponent,
  ForgotPasswordComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    MaterialComponentsModule,
    StoreModule.forFeature('customer', CustomerReducer),
    EffectsModule.forFeature([CustomerEffects]),
    RouterModule.forChild(CustomersRoutes)
  ],
  declarations: [
    ...components
  ],

  providers: [CustomerFacade]
})
export class CustomersModule { }
