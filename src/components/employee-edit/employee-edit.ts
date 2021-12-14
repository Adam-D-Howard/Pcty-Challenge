import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IEmployee, IPerson } from './../../models/IPerson';
import { EmployeeDataServiceProvider } from '../../providers/employee-data-service/employee-data-service';
import { UiHelperProvider } from '../../providers/ui-helper/ui-helper';

@Component({
  selector: 'employee-edit',
  templateUrl: 'employee-edit.html'
})
export class EmployeeEditComponent implements OnInit, OnChanges {
  @Input() employee: IEmployee = null;
  @Input() new: boolean = false;
  @Input() employeeDataService: EmployeeDataServiceProvider;

  selectedDependent: IPerson = null;
  selectedDependentId: number = null;

  constructor(private uiHelper: UiHelperProvider) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee']) {
      this.selectedDependent = null;
    }
  }

  addDependentClick() {
    this.selectedDependentId = -1;
    this.selectedDependent = this.employeeDataService.getDependentDefaultValues(this.employee);
  }

  saveDependentClick() {
    if (this.selectedDependentId === -1) {
      this.employeeDataService.addDependent(this.employee, this.selectedDependent);
      this.selectedDependentId = this.selectedDependent.id;
    } else {
      this.employeeDataService.updateDependent(this.employee, this.selectedDependent);
    }
  }

  deleteDependentClick() {
    this.uiHelper.confirm('Confirm Delete', 'Are you sure you want to delete this employee?', (value) => {
      if (value) {
        this.employeeDataService.deleteDependent(this.employee, this.selectedDependent.id);
        this.selectedDependent = null;
      }
    });
  }

  dependentSelectChanged() {
    this.selectedDependent = this.employeeDataService.getDependentById(this.employee, this.selectedDependentId);
  }
}
