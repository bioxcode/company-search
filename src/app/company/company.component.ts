import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CompanyDetails } from '../../types';

@Component({
  selector: 'company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit, OnDestroy {
  @HostBinding('class.page') readonly page = true;

  companyNumber?: string;
  data?: CompanyDetails;

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
              this.data = data;
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      });
    }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
