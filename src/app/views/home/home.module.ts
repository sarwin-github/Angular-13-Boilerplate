import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './banner/banner.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MaterialComponentsModule } from '../../shared/components/material-components/material-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
  	HomeComponent,
    BannerComponent,
    AboutUsComponent
  ]
})
export class HomeModule{ }
