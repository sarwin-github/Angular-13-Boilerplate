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
    RouterModule.forChild(CustomersRoutes)
  ],
  declarations: [
    ...components
  ]
})
export class CustomersModule { }
