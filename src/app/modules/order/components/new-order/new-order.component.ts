import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { StaticAPI } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpGenService: HttpService,
    private router: Router
  ) {}
  vendorList: any = [];
  newOrder = this.fb.group({
    vendorId: ['', Validators.required],
    date: [new Date(), Validators.required],
    qty: ['', Validators.required],
    unitPrice: ['', Validators.required],
    lotNumber: ['', Validators.required],
    manufacturingDate: ['', Validators.required],
  });
  editOrderId: any;
  ngOnInit(): void {
    this.getVendorList();
    this.route.params.subscribe((params) => {
      this.editOrderId = params['id'];
      if (this.editOrderId) this.getOrderDetails(this.editOrderId);
    });
  }

  getOrderDetails(editOrderId: any) {
    this.httpGenService
      .GET_DATA(environment.api_endpoint + StaticAPI.orderDetails + editOrderId)
      .subscribe((response: any) => {
        this.newOrder.controls['vendorId'].patchValue(response[0].vendorId);
        this.newOrder.controls['vendorId'].disable();
        this.newOrder.controls['date'].disable();
        this.newOrder.controls['date'].patchValue(response[0].date);
        this.newOrder.controls['qty'].patchValue(response[0].qty);
        this.newOrder.controls['unitPrice'].patchValue(response[0].unitPrice);
        this.newOrder.controls['lotNumber'].patchValue(response[0].lotNumber);
        this.newOrder.controls['manufacturingDate'].patchValue(
          response[0].manufacturingDate
        );
      });
  }
  getVendorList() {
    this.httpGenService
      .GET_DATA(environment.api_endpoint + StaticAPI.vendorList)
      .subscribe((response) => {
        this.vendorList = response;
      });
  }

  onSubmit() {
    if (!this.newOrder.valid) {
      this.newOrder.markAllAsTouched();
      return;
    }
    var obj: any = this.newOrder.value;
    if (this.editOrderId) {
      obj.id = this.editOrderId;
    }
    this.httpGenService
      .POST_DATA(environment.api_endpoint + StaticAPI.addOrders, obj)
      .subscribe((response: any) => {
        if (response.status == 'true') {
          this.router.navigate(['order']);
        } else {
          alert(response.message);
        }
      });
  }
}
