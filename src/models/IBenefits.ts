export interface IDiscount {
  discountCode: string;
  discountRate: number;
}

export interface IBenefit {
  benefitCode: string;
  annualEmployeeCost: number;
  annualDependentCost: number;
  discounts: IDiscount[];
}
