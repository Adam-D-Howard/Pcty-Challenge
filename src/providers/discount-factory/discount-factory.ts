import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscount } from './../../models/IBenefits';
import { IDiscountCalcFunctionParameters, DiscountFunction } from '../../models/BenefitCalcParams';

@Injectable()
export class DiscountFactoryProvider {
  constructor(public http: HttpClient) {}

  getDiscountCalculation(discount: IDiscount): DiscountFunction {
    switch (discount.discountCode.toUpperCase()) {
      case 'LTRA10':
        return (discountCalcParams: IDiscountCalcFunctionParameters) => {
          return this.discountLtrA10(discountCalcParams);
        };
    }
    return null;
  }

  discountLtrA10(discountCalcParams: IDiscountCalcFunctionParameters): number {
    let totalDiscount = 0;
    if (discountCalcParams.employee.name.length > 0) {
      if (discountCalcParams.employee.name.charAt(0).toUpperCase() === 'A') {
        totalDiscount += discountCalcParams.benefit.annualEmployeeCost * discountCalcParams.discount.discountRate;
      }
    }
    discountCalcParams.employee.dependents.forEach((dep) => {
      if (dep.name.length > 0) {
        if (dep.name.charAt(0).toUpperCase() === 'A') {
          totalDiscount += discountCalcParams.benefit.annualDependentCost * discountCalcParams.discount.discountRate;
        }
      }
    });
    return totalDiscount;
  }
}
