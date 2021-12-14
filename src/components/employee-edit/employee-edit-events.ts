import { IEmployee } from './../../models/IPerson';

export interface EmployeeEditEvent {
  eventType: string;
  employee: IEmployee;
}
