import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorRoutes } from './vendorRoutes';
import { NewVendorComponent } from './components/new-vendor/new-vendor.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

@NgModule({
  declarations: [NewVendorComponent,VendorListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(VendorRoutes),
    SharedModule,
  ],
  exports: [],
})
export class VendorModule {}
