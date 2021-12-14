import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../../models/IPerson';
import { IBenefitCalcFunctionParameters } from '../../models/BenefitCalcParams';
import { BenefitFactoryProvider } from '../../providers/benefit-factory/benefit-factory';
import { IBenefitRportData } from './benefit-report-data';

@Component({
  selector: 'benefit-report',
  templateUrl: 'benefit-report.html'
})
export class BenefitReportComponent implements OnInit {
  @Input() sourceData: IEmployee[];

  reportResults: IBenefitRportData[] = [];
  totalCost: number;

  constructor(private benefitFactory: BenefitFactoryProvider) {}

  ngOnInit() {
    this.calcBenefitCosts();
  }

  calcBenefitCosts() {
    this.totalCost = 0;
    this.sourceData.forEach((employee) => {
      let employeeCost = 0;
      let benefitCalcParams: IBenefitCalcFunctionParameters = {
        employee: employee,
        benefit: null
      };
      employee.benefits.forEach((benefit) => {
        benefitCalcParams.benefit = benefit;
        const benefitCalc = this.benefitFactory.getBenefitCostCalculation(benefit);
        employeeCost = Math.round(benefitCalc(benefitCalcParams) * 100) / 100;
        this.totalCost += employeeCost;
        this.reportResults.push({
          employee: employee,
          benefit: benefit,
          benefitCost: employeeCost
        });
      });
    });
    this.totalCost = Math.round(this.totalCost * 100) / 100;
  }
}
