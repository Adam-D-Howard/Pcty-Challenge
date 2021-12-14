import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { EmployeeEditComponent } from './employee-edit/employee-edit';
import { PersonListComponent } from './person-list/person-list';
import { BenefitReportComponent } from './benefit-report/benefit-report';

@NgModule({
  declarations: [EmployeeEditComponent,
    PersonListComponent,
    BenefitReportComponent],
  imports: [BrowserModule, IonicModule],
  exports: [EmployeeEditComponent,
    PersonListComponent,
    BenefitReportComponent]
})
export class ComponentsModule {}
