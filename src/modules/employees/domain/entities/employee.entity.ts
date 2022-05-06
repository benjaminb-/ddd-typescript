import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { EmployeeCreated } from "../events/employee-created.event";
import { EmployeeJobChanged } from "../events/employee-job-changed.event";
import { Email } from "../value-objects/email.value-object";
import { ID } from "../value-objects/id.value-object";
import { Job } from "./job.entity";

interface EmployeeProps {
  id: ID;
  email: Email;
  firstName: string;
  lastName: string;
  job: Job;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  private constructor(props: EmployeeProps, id?: string) {
    super(props, id);
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

  get job(): Job {
    return this.props.job;
  }

  get isSenior(): boolean {
    return this.job.level > 5;
  }

  public static create(props: EmployeeProps): Employee {
    const employee = new Employee(props);
    employee.addEvent(new EmployeeCreated(employee));
    return employee;
  }

  public updateEmail(email: string): void {
    this.props.email = Email.create(email) as Email;
  }

  public changeJob(job: Job): void {
    const previousJob = this.job;
    this.props.job = job;
    super.addEvent(new EmployeeJobChanged(previousJob));
  }
}
