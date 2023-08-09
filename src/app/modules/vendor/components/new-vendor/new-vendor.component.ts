import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { StaticAPI } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss'],
})
export class NewVendorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpGenService: HttpService,
    private router: Router
  ) {}
  newVendor = this.fb.group({
    vendorName: ['', Validators.required],
    typeOfPaper: ['', Validators.required],
  });
  editVendorId: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editVendorId = params['id'];
      if (this.editVendorId) this.getVendroDetails(this.editVendorId);
    });
  }

  getVendroDetails(editVendorId: any) {
    this.httpGenService
      .GET_DATA(
        environment.api_endpoint + StaticAPI.vendorDetails + editVendorId
      )
      .subscribe((response: any) => {
        this.newVendor.controls['vendorName'].patchValue(
          response[0].vendorName
        );
        this.newVendor.controls['typeOfPaper'].patchValue(
          response[0].typeOfPaper
        );
      });
  }

  onSubmit() {
    if (!this.newVendor.valid) {
      this.newVendor.markAllAsTouched();
      return;
    }
    var obj: any = this.newVendor.value;
    if (this.editVendorId) {
      obj.id = this.editVendorId;
    }
    this.httpGenService
      .POST_DATA(environment.api_endpoint + StaticAPI.addVendor, obj)
      .subscribe((response: any) => {
        if (response.status == 'true') {
          this.router.navigate(['vendor']);
        } else {
          alert(response.message);
        }
      });
  }
}
