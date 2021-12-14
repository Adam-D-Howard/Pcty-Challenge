import { IBenefit } from '../../models/IBenefits';
import { IEmployee } from '../../models/IPerson';

export interface IBenefitRportData {
  employee: IEmployee;
  benefit: IBenefit;
  benefitCost: number;
}
