import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomProfileLoaderComponent } from './components/custom-profile-loader/custom-profile-loader.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './components/material-components/material-components.module';
import { FooterComponent } from './components/footer/footer.component'
import { DatepickerComponent } from './components/input/date-picker/date-picker.component';
import { ReusableTableComponent } from './components/reusable-table/reusable-table.component';

const classesToInclude: any[] = [
  HeaderComponent,
  CustomProfileLoaderComponent,
  FooterComponent,
  DatepickerComponent,
  ReusableTableComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
  ],
  entryComponents: [classesToInclude],
  providers: [],
  declarations: classesToInclude,
  exports: classesToInclude
})
export class SharedModule { }
