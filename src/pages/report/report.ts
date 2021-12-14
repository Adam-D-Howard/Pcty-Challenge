import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEmployee } from './../../models/IPerson';
import { EmployeeDataServiceProvider } from '../../providers/employee-data-service/employee-data-service';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage implements OnInit {
  reportData: IEmployee[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeDataService: EmployeeDataServiceProvider
  ) {}

  ionViewDidLoad() {}

  ngOnInit() {
    this.reportData = this.employeeDataService.employeeDataCache;
  }
}
