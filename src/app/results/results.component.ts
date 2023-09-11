import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { SearchResponse } from '../../types';

@Component({
  selector: 'results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit, OnDestroy {
  @HostBinding('class.page') readonly page = true;

  searchString?: string;

  data?: SearchResponse;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  private ngUnsubscribe = new Subject<void>();

  ngOnInit() {
      this.route.queryParamMap.subscribe(params => {
        this.searchString = params.get('search') ?? undefined;

        if (this.searchString) {
          this.dataService.getSearchData(this.searchString).pipe(
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
