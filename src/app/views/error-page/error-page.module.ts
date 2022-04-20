import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorPageRoutes } from './error-page.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ErrorPageRoutes)
  ],
  declarations: [
  
    ErrorNotFoundComponent
  ]
})
export class ErrorPageModule{ }
