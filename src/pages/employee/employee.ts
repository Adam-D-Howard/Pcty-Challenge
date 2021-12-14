import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEmployee } from './../../models/IPerson';
import { EmployeeDataServiceProvider } from '../../providers/employee-data-service/employee-data-service';
import { UiHelperProvider } from '../../providers/ui-helper/ui-helper';

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html'
})
export class EmployeePage {
  selectedEmployeeId: number = null;
  selectedEmployee: IEmployee = null;
  newEmployee: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private uiHelper: UiHelperProvider,
    public employeeService: EmployeeDataServiceProvider
  ) {}

  ionViewDidLoad() {}

  employeeSelectChanged() {
    this.selectedEmployee = this.employeeService.getEmployeeById(this.selectedEmployeeId);
  }

  addEmployeeClick() {
    this.newEmployee = true;
    this.selectedEmployeeId = -1;
    this.selectedEmployee = this.employeeService.getEmployeeDefaultValues();
  }

  saveEmployeeClick() {
    if (this.newEmployee) {
      this.employeeService.addEmployee(this.selectedEmployee);
      this.selectedEmployeeId = this.selectedEmployee.id;
    } else {
      this.employeeService.updateEmployee(this.selectedEmployee);
    }
  }

  deleteEmployeeClick() {
    this.uiHelper.confirm('Confirm Delete', 'Are you sure you want to delete this employee?', (value) => {
      if (value) {
        this.employeeService.deleteEmployee(this.selectedEmployeeId);
        if (this.selectedEmployee && this.selectedEmployee.id === this.selectedEmployeeId) {
          this.selectedEmployee = null;
        }
      }
    });
  }
}
