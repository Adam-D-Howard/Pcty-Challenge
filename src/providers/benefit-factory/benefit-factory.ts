import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscountFactoryProvider } from './../discount-factory/discount-factory';
import { IBenefit } from './../../models/IBenefits';
import { IBenefitCalcFunctionParameters, BenefitFunction } from '../../models/BenefitCalcParams';

@Injectable()
export class BenefitFactoryProvider {
  constructor(public http: HttpClient, private discountFactory: DiscountFactoryProvider) {}

  getBenefitCostCalculation(benefit: IBenefit): BenefitFunction {
    switch (benefit.benefitCode.toUpperCase()) {
      case 'STDPKG':
        return (benefitCalcParams: IBenefitCalcFunctionParameters) => {
          return this.benefitStdPkgCost(benefitCalcParams);
        };
    }
  }

  benefitStdPkgCost(benefitCalcParams: IBenefitCalcFunctionParameters): number {
    let baseCost = benefitCalcParams.benefit.annualEmployeeCost;
    baseCost += benefitCalcParams.benefit.annualDependentCost * benefitCalcParams.employee.dependents.length;

    let dicountCalcParams = {
      employee: benefitCalcParams.employee,
      benefit: benefitCalcParams.benefit,
      discount: null
    };
    let discountAmt = 0;
    benefitCalcParams.benefit.discounts.forEach((discount) => {
      dicountCalcParams.discount = discount;
      const discountCalc = this.discountFactory.getDiscountCalculation(discount);
      discountAmt += discountCalc(dicountCalcParams);
    });

    return (baseCost - discountAmt) / benefitCalcParams.employee.annualPayChecks;
  }
}
