import { IBenefit, IDiscount } from './IBenefits';
import { IEmployee } from './IPerson';

export type BenefitFunction = (benefitCalcParams: IBenefitCalcFunctionParameters) => number;
export type DiscountFunction = (discountCalcParams: IDiscountCalcFunctionParameters) => number;

export interface IBenefitCalcFunctionParameters {
  employee: IEmployee;
  benefit: IBenefit;
}

export interface IDiscountCalcFunctionParameters {
  employee: IEmployee;
  benefit: IBenefit;
  discount: IDiscount;
}
