import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { EmployeeRemunerationAdded } from "../events/remuneration-added.event";
import { Remuneration } from "../value-objects/remuneration.value-object";

interface EmployeeProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  remunerations: Array<Remuneration>;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  get id(): string {
    return this.props.id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email;
  }

  get remunerations(): Array<Remuneration> {
    return this.props.remunerations;
  }

  public addRemuneration(remuneration: Remuneration): void {
    if (
      this.remunerations.find(
        (r) => r.props.startedAt === remuneration.props.startedAt
      )
    ) {
      throw new Error("Remuneration already exists");
    }

    this.props.remunerations.push(remuneration);

    this.addEvent(new EmployeeRemunerationAdded(this));
  }

  public currentRemuneration(period: Date): Remuneration {
    return this.remunerations[0];
  }
}
