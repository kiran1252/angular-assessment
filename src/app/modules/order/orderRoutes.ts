import { Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/Order-list.component';
import { NewOrderComponent } from './components/new-Order/new-Order.component';

export const OrderRoutes: Routes = [
  {
    path: '',
    component: OrderListComponent,
  },
  {
    path: 'new',
    component: NewOrderComponent,
  },
  {
    path: 'new/:id',
    component: NewOrderComponent,
  },
];
