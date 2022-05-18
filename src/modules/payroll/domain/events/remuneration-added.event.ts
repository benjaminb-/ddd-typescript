import { DomainEvent } from "../../../../shared/domain/domain.event";
import { Employee } from "../entities/employee.entity";

export class EmployeeRemunerationAdded extends DomainEvent {
  constructor(employee: Employee) {
    super();
  }
}
