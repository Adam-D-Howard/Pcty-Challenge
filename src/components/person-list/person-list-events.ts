import { IPerson } from '../../models/IPerson';

export interface PersonListEvent {
  eventType: string;
  person: IPerson;
}
