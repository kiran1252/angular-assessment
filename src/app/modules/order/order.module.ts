import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderRoutes } from './orderRoutes';
import { NewOrderComponent } from './components/new-Order/new-Order.component';
import { OrderListComponent } from './components/order-list/Order-list.component';

@NgModule({
  declarations: [NewOrderComponent, OrderListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(OrderRoutes),
    SharedModule,
  ],
  exports: [],
})
export class OrderModule {}
