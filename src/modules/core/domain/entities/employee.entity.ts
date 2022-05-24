import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { EmployeeCreated } from "../events/employee-created.event";
import { EmployeeInformationUpdated } from "../events/employee-information-updated.event";
import { Email } from "../value-objects/email.value-object";

export interface EmployeeProps {
  id: ID;
  email: Email;
  firstName: string;
  lastName: string;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  private constructor(props: EmployeeProps, id?: string) {
    super(props, id);
  }

  get id(): string {
    return this.props.id.value;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email.value;
  }

  public static create(props: EmployeeProps): Employee {
    const employee = new Employee(props);
    employee.addEvent(new EmployeeCreated(employee.props));
    return employee;
  }

  public updateInformation(
    firstName: string,
    lastName: string,
    email: string
  ): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
    this.props.email = Email.create(email);
    this.addEvent(new EmployeeInformationUpdated(this.props));
  }
}
