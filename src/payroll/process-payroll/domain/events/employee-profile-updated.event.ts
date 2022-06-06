import { DomainEvent } from "../../../../shared/domain/domain.event";
import { EmployeePayrollProps } from "../entities/employee.entity";

export class EmployeeProfileUpdated extends DomainEvent {
  constructor(employee: EmployeePayrollProps) {
    super();
  }
}
