import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../../environments/environment';
import { AdminsRoutes } from './admin.routing';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AdminsRoutes)
  ],
  declarations: [
    AdminSigninComponent,
    AdminSignupComponent,
    AdminProfileComponent
  ]
})
export class AdminsModule { }
