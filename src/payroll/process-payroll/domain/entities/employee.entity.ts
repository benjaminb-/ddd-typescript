import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { EmployeeCreated } from "../events/employee-created.event";
import { EmployeeProfileUpdated } from "../events/employee-profile-updated.event";

export interface EmployeePayrollProps {
  id?: ID;
  monthlySalary: number;
}

export class EmployeePayroll extends AggregateRoot<EmployeePayrollProps> {
  private constructor(props: EmployeePayrollProps) {
    props.id = ID.create();
    super(props);
  }

  // here we expose only properties used outside with getters
  get id(): string {
    return this.props.id?.value ?? "";
  }

  get monthlySalary(): number {
    return this.props.monthlySalary;
  }

  public static create(props: EmployeePayrollProps): EmployeePayroll {
    const employee = new EmployeePayroll(props);
    if (!props.id) {
      // trigger event if we create and no id, new employee
      employee.addEvent(new EmployeeCreated(employee.props));
    }
    return employee;
  }

  // update the profile
  public updateMonthlySalary(monthlySalary: number): void {
    this.props.monthlySalary = monthlySalary;
    // trigger event
    this.addEvent(new EmployeeProfileUpdated(this.props));
  }
}
