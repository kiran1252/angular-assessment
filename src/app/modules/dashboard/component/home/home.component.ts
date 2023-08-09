import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { PaperType, StaticAPI } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private httpGenService: HttpService) {
    Chart.register(...registerables);
  }
  orderList: any = [];
  vendorOrderList: any = [];
  vendorList: any = [];
  @ViewChild('TABLE') table: any;
  @ViewChild('Vendor') vendor: any;
  ngOnInit(): void {
    this.getVendorList();
    this.getOrderList();
  }
  exportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'orders_data.xlsx');
  }
  getOrderList() {
    this.httpGenService
      .GET_DATA(environment.api_endpoint + StaticAPI.getOrders)
      .subscribe((response) => {
        this.orderList = response;
        this.orderList = this.orderList.filter((w:any)=>w.isActive == true);
        this.orderList.forEach((element: any) => {
          var vendorData = this.vendorList.filter(
            (w: any) => w.id == element.vendorId
          );
          element.vendorName = vendorData[0].vendorName;
          element.vendorPaperType = vendorData[0].typeOfPaper;
          var isExist = this.vendorOrderList.filter(
            (w: any) => w.vendorName == element.vendorName
          );
          if (isExist.length > 0) {
            isExist[0].count = isExist[0].count + 1;
          } else {
            element.count = 1;
            this.vendorOrderList.push(element);
          }
        });
        const ctx: any = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.vendorOrderList.map((row: any) => row.vendorName),
            datasets: [
              {
                label: 'Order Count',
                data: this.vendorOrderList.map((row: any) => row.count),
              },
            ],
          },
        });
      });
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

  exportTOExcelVendor() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.vendor.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'vendors_data.xlsx');
  }
}
