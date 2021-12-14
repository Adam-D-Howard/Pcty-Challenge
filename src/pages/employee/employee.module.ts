import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { EmployeePage } from './employee';

@NgModule({
  declarations: [EmployeePage],
  imports: [ComponentsModule, IonicPageModule.forChild(EmployeePage)]
})
export class EmployeePageModule {}
