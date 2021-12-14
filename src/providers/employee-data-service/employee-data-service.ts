import { IBenefit } from './../../models/IBenefits';
import { IEmployee, IPerson } from './../../models/IPerson';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDataServiceProvider {
  public employeeDataCache: IEmployee[] = this.getDefaultEmployeeData();
  public benefitDataCache: IBenefit[] = this.getDefaultBenefitData();

  constructor(public http: HttpClient) {}

  getAllEmployees(): IEmployee[] {
    return this.employeeDataCache;
  }

  addEmployee(newEmployee: IEmployee): void {
    this.employeeDataCache.push(newEmployee);
  }

  deleteEmployee(id: number): void {
    const index = this.employeeDataCache.findIndex((elem) => elem.id === id);
    if (index > -1) {
      this.employeeDataCache.splice(index, 1);
    }
  }

  updateEmployee(employee: IEmployee): void {
    const index = this.employeeDataCache.findIndex((elem) => elem.id === employee.id);
    if (index > -1) {
      this.employeeDataCache[index] = employee;
    }
  }

  getEmployeeById(employeeId: number): IEmployee {
    const index = this.employeeDataCache.findIndex((elem) => elem.id === employeeId);
    if (index > -1) {
      return this.employeeDataCache[index];
    }
    return null;
  }

  getEmployeeDefaultValues(): IEmployee {
    return {
      id: this.nextEmployeeId(),
      name: '',
      dependents: [],
      annualSalary: 2000 * 26,
      benefits: []
    };
  }

  nextEmployeeId(): number {
    if (this.employeeDataCache && this.employeeDataCache.length > 0) {
      const maxEmployee = this.employeeDataCache.reduce((a, b) => (a.id > b.id ? a : b));
      if (maxEmployee) {
        return maxEmployee.id + 1;
      }
    }
    return 1;
  }

  getDependentById(employee: IEmployee, dependentId: number): IPerson {
    if (employee && employee.dependents && employee.dependents.length > 0) {
      const index = employee.dependents.findIndex((elem) => elem.id === dependentId);
      if (index > -1) {
        return employee.dependents[index];
      }
      return null;
    }
  }

  getDependentDefaultValues(employee: IEmployee): IPerson {
    return {
      id: this.getNextDependentId(employee),
      name: ''
    };
  }

  addDependent(employee: IEmployee, newDependent: IPerson): void {
    employee.dependents.push(newDependent);
    this.updateEmployee(employee);
  }

  updateDependent(employee: IEmployee, dependent: IPerson): void {
    const index = employee.dependents.findIndex((elem) => elem.id === dependent.id);
    if (index > -1) {
      employee.dependents[index] = dependent;
    }
  }

  getNextDependentId(employee: IEmployee): number {
    if (employee && employee.dependents && employee.dependents.length > 0) {
      const maxDependent = employee.dependents.reduce((a, b) => (a.id > b.id ? a : b));
      if (maxDependent) {
        return maxDependent.id + 1;
      }
    }
    return 1;
  }

  deleteDependent(employee: IEmployee, dependentId: number) {
    const index = employee.dependents.findIndex((elem) => elem.id === dependentId);
    if (index > -1) {
      employee.dependents.splice(index, 1);
    }
  }

  private getDefaultEmployeeData(): IEmployee[] {
    const data: IEmployee[] = [
      {
        id: 1,
        name: 'Aaron',
        dependents: [
          { id: 1, name: 'Sarah' },
          { id: 2, name: 'Billy' }
        ]
      },
      { id: 2, name: 'Trevor', dependents: [] },
      { id: 3, name: 'Alice', dependents: [] },
      { id: 4, name: 'Ricky', dependents: [{ id: 3, name: 'Lucy' }] },
      {
        id: 5,
        name: 'Han',
        dependents: [
          { id: 4, name: 'Leia' },
          { id: 5, name: 'Ben' }
        ]
      },
      { id: 6, name: 'Samantha', dependents: [] }
    ];

    data.forEach((elem) => {
      elem.benefits = this.getDefaultBenefitData();
      elem.annualPayChecks = 26;
      elem.annualSalary = 2000 * elem.annualPayChecks;
    });

    return data;
  }

  private getDefaultBenefitData(): IBenefit[] {
    return [
      {
        benefitCode: 'stdPkg',
        annualEmployeeCost: 1000,
        annualDependentCost: 500,
        discounts: [
          {
            discountCode: 'LtrA10',
            discountRate: 0.1
          }
        ]
      }
    ];
  }
}
