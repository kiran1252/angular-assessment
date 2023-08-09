import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { PaperType, StaticAPI } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent implements OnInit {
  constructor(private httpGenService: HttpService,private router: Router) {}
  vendorList: any = [];
  ngOnInit(): void {
    this.getVendorList();
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
  editVendor(id: any) {
    this.router.navigate(['vendor/new',id]);    
  }
}
