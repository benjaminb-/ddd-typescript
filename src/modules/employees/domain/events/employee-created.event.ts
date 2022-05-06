import { DomainEvent } from "../../../../shared/domain/domain.event";
import { Employee } from "../entities/employee.entity";

export class EmployeeCreated extends DomainEvent {
  constructor(employee: Employee) {
    super();
  }
}
