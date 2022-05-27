import { DomainEvent } from "../../../../shared/domain/domain.event";
import { EmployeeProps } from "../entities/employee.entity";

export class EmployeeCreated extends DomainEvent {
  constructor(employee: EmployeeProps) {
    super();
  }
}
