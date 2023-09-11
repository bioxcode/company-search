import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CompanyDetails, OfficersResponse, SearchResponse } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchResponse?: SearchResponse;

  constructor(private http: HttpClient) { }

  getSearchData(searchString: string): Observable<SearchResponse> {
    const params = new HttpParams().set('Query', searchString);
    const headers = new HttpHeaders().set('x-api-key', environment.apiKey);
    return this.http.get<SearchResponse>('/TruProxyAPI/rest/Companies/v1/Search', { params, headers }).pipe(
      tap((response: SearchResponse) => {
        this.searchResponse = response;
      })
    );
  }

  /**
   * Would this make more sense to have a specific endpoint to return company details directly?
   * This method retrieves company details based on stored search results.
   * The current implementation can return details only for companies that are already in the latest search results.
   */
  getCompanyDetails(companyNumber: string): Observable<CompanyDetails | undefined> {
    if (this.searchResponse) {
      const companyDetails= this.searchResponse.items.find((company) => company.company_number === companyNumber);
      if (companyDetails) {
        return of(companyDetails);
      }
    }
    return of(undefined);
  }

  getCompanyOfficers(companyNumber: string): Observable<OfficersResponse> {
    const params = new HttpParams().set('CompanyNumber', companyNumber);
    const headers = new HttpHeaders().set('x-api-key', environment.apiKey);
    return this.http.get<OfficersResponse>('/TruProxyAPI/rest/Companies/v1/Officers', { params, headers });
  }
}
