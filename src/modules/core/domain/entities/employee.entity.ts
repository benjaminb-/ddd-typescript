import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { EmployeeCreated } from "../events/employee-created.event";
import { EmployeeProfileUpdated } from "../events/employee-profile-updated.event";
import { Email } from "../value-objects/email.value-object";

export interface EmployeeProps {
  id?: ID;
  email: Email;
  firstName: string;
  lastName: string;
  endedAt?: Date | null;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  private constructor(props: EmployeeProps) {
    props.id = ID.create();
    super(props);
  }

  // here we expose only properties used outside with getters
  get id(): string | null {
    return this.props.id?.value || null;
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

  // exemple of a generated getter based on other props
  get hasEnded(): boolean {
    return !!this.endedAt;
  }

  get endedAt(): Date | null {
    return this.props.endedAt ?? null;
  }

  // static method to create
  public static create(props: EmployeeProps): Employee {
    const employee = new Employee(props);
    if (!props.id) {
      // trigger event if we create and no id, new employee
      employee.addEvent(new EmployeeCreated(employee.props));
    }
    return employee;
  }

  // update the profile
  public updateProfile(
    firstName: string,
    lastName: string,
    email: Email
  ): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
    this.props.email = email;
    // trigger event
    this.addEvent(new EmployeeProfileUpdated(this.props));
  }

  public restore(): void {
    // this validation has a purpose in the domain, so it's integrated in the entity
    if (!this.hasEnded) {
      throw new Error("employee not ended");
    }
    this.props.endedAt = null;
    // trigger event EmployeeRestored
  }

  public end(endedAt: Date): void {
    // this validation has a purpose in the domain, so it's integrated in the entity
    if (this.hasEnded) {
      throw new Error("employee already ended");
    }
    this.props.endedAt = endedAt;
    // trigger event EmployeeEnded
  }
}
