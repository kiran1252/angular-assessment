import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutes } from './dashboardRoutes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule
  ],
  exports: [],
})
export class DashboardModule {}
