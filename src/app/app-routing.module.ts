import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { CompanyComponent } from './company/company.component';
import { OfficersComponent } from './officers/officers.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'companies', component: ResultsComponent },
  { path: 'companies/:companyNumber', component: CompanyComponent },
  { path: 'companies/:companyNumber/officers', component: OfficersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
