import { Routes } from '@angular/router';
import { CustomerSigninComponent } from './customer-signin/customer-signin.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomerGuard } from '../../../shared/guard/auth/customer.guard';

export const CustomersRoutes: Routes = [
  { 
    path: 'account/login',
    component: CustomerSigninComponent
  },
  { 
    path: 'account/signup', 
    component: CustomerSignupComponent 
  },

  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },
  { 
    path: '', 
    component: HeaderComponent,
    children: [
      {
        path: 'profile',
        component: CustomerProfileComponent,
        canActivate: [CustomerGuard]
      }
    ]
  },
];
