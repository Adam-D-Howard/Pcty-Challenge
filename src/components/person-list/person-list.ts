import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPerson } from '../../models/IPerson';
import { EmployeeDataServiceProvider } from '../../providers/employee-data-service/employee-data-service';
import { PersonListEvent } from './person-list-events';

@Component({
  selector: 'person-list',
  templateUrl: 'person-list.html'
})
export class PersonListComponent {
  @Input() displayList: IPerson[];
  @Input() selectedPerson: IPerson = null;
  @Input() employeeDataService: EmployeeDataServiceProvider;

  @Output() personListEvent: EventEmitter<PersonListEvent> = new EventEmitter<PersonListEvent>();

  constructor() {}

  onClick(event, person) {
    this.selectedPerson = person;
    this.personListEvent.emit({ eventType: 'click', person: person });
  }

  onDelete(event, person) {
    this.personListEvent.emit({ eventType: 'delete', person: person });
    event.stopPropagation();
  }
}
