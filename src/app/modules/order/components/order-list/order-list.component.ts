import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { PaperType, StaticAPI } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(private httpGenService: HttpService, private router: Router) {}
  orderList: any = [];
  vendorList: any = [];
  ngOnInit(): void {
    this.getVendorList();
    this.getOrderList();
  }
  getOrderList() {
    this.httpGenService
      .GET_DATA(environment.api_endpoint + StaticAPI.getOrders)
      .subscribe((response) => {
        this.orderList = response;
        this.orderList.forEach((element: any) => {
          var vendorData = this.vendorList.filter(
            (w: any) => w.id == element.vendorId
          );
          element.vendorName = vendorData[0].vendorName;
          element.vendorPaperType = vendorData[0].typeOfPaper;
          element.expiryDate = this.getExpiryDate(element);
        });
      });
  }
  getExpiryDate(data: any) {
    var paperTypeList = PaperType;
    var typeObj = paperTypeList.filter((w:any) => w.id == data.vendorPaperType);
    var result = new Date(data.date);
      result.setDate(result.getDate() + +(typeObj[0].expiry));
      return result;
  }
  getVendorList() {
    this.httpGenService
      .GET_DATA(environment.api_endpoint + StaticAPI.vendorList)
      .subscribe((response) => {
        this.vendorList = response;
      });
  }

  getPaperType(paperTypeId: any) {
    return PaperType.filter((w) => w.id == paperTypeId)[0].name;
  }
  editOrder(id: any) {
    this.router.navigate(['order/new', id]);
  }
  deleteOrder(obj: any, flag: boolean) {
    obj.isActive = flag;
    this.httpGenService
      .POST_DATA(environment.api_endpoint + StaticAPI.addOrders, obj)
      .subscribe((response: any) => {
        if (response.status == 'true') {
          this.getOrderList();
        } else {
          alert(response.message);
        }
      });
  }
}
