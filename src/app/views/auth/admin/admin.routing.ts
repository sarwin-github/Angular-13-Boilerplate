import { Routes } from '@angular/router';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminGuard } from '../../../shared/guard/auth/admin.guard';

export const AdminsRoutes: Routes = [
  { 
    path: 'signin',
    component: AdminSigninComponent
  },
  { 
    path: 'signup', 
    component: AdminSignupComponent 
  },
  { 
    path: 'profile', 
    component: AdminProfileComponent,
    canActivate: [AdminGuard]
  },
];
