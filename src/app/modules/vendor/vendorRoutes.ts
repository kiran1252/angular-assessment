import { Routes } from '@angular/router';
import { NewVendorComponent } from './components/new-vendor/new-vendor.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
export const VendorRoutes: Routes = [
  {
    path: '',
    component: VendorListComponent,
  },
  {
    path: 'new',
    component: NewVendorComponent,
  },
  {
    path: 'new/:id',
    component: NewVendorComponent,
  },
];
