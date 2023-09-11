import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @HostBinding('class.page') readonly page = true;

  searchForm = new FormGroup({
    searchString: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private router: Router) {}

  ngOnInit() {}

  onSearch() {
    this.searchForm.markAllAsTouched();
    if (this.searchForm.valid) {
      this.router.navigate(['/companies'], {
        queryParams: {
          search: this.searchForm.value.searchString
        }
      });
    }
  }
}
