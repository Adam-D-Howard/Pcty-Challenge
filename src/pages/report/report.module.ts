import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { ReportPage } from './report';

@NgModule({
  declarations: [ReportPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ReportPage)]
})
export class ReportPageModule {}
