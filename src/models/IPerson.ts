import { IBenefit } from './IBenefits';

export interface IPerson {
  id: number;
  name: string;
}

export interface IEmployee extends IPerson {
  dependents: IPerson[];
  benefits?: IBenefit[];
  annualSalary?: number;
  annualPayChecks?: number;
}
