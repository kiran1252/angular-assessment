import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./modules/vendor/vendor.module').then(
        (m) => m.VendorModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./modules/order/order.module').then(
        (m) => m.OrderModule
      ),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/pagenotfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
