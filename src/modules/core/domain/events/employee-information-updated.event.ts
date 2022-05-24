import { DomainEvent } from "../../../../shared/domain/domain.event";
import { EmployeeProps } from "./../entities/employee.entity";

export class EmployeeInformationUpdated extends DomainEvent {
  constructor(employee: EmployeeProps) {
    super();
  }
  public handle() {
    // here process something about employee information updated
  }
}
