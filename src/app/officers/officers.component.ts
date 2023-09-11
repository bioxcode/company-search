import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CompanyDetails, OfficersResponse } from '../../types';

@Component({
  selector: 'officers',
  templateUrl: './officers.component.html'
})
export class OfficersComponent implements OnInit, OnDestroy {
  @HostBinding('class.page') readonly page = true;

  companyNumber?: string;

  companyDetails?: CompanyDetails;
  data?: OfficersResponse;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  private ngUnsubscribe = new Subject<void>();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyNumber = params['companyNumber'] ?? undefined;
      if (this.companyNumber) {
        this.dataService.getCompanyDetails(this.companyNumber).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((data) => {
          if (data) {
            this.companyDetails = data;
          } else {
            this.router.navigate(['/']);
          }
        });
        this.dataService.getCompanyOfficers(this.companyNumber).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((data) => {
          this.data = data;
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
