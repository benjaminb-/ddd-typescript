import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { EmployeeCreated } from "../events/employee-created.event";
import { EmployeeProfileUpdated } from "../events/employee-profile-updated.event";
import { Email } from "../value-objects/email.value-object";
import { EmployeeEquipmentAssignedSpecification } from "./../specifications/employee-email-tld-allowed.specification";

export interface EmployeeProps {
  id?: ID;
  email: Email;
  firstName: string;
  lastName: string;
  endedAt?: Date | null;
}

export interface EquipmentAssignment {
  equipmentId: string;
  assignDate: Date;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  private equipmentList: Array<EquipmentAssignment>;

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

  get listOfEquipments(): Array<EquipmentAssignment> {
    return this.equipmentList;
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
    if (this.equipmentList.length > 0) {
      throw new Error("Employee still has equipment assigned.");
    }

    if (this.hasEnded) {
      throw new Error("employee already ended");
    }
    this.props.endedAt = endedAt;
    // trigger event EmployeeEnded
  }

  public assignEquipment(equipmentId: string, assignDate: Date): void {
    if (
      !new EmployeeEquipmentAssignedSpecification(
        this.equipmentList
      ).isSatisfiedBy(equipmentId)
    ) {
      throw new Error("Equipment already assigned.");
    }

    this.equipmentList.push({ equipmentId, assignDate });
    // handle event: equipmentAssigned
  }

  public returnEquipment(equipmentId: string): void {
    if (
      !new EmployeeEquipmentAssignedSpecification(
        this.equipmentList
      ).isSatisfiedBy(equipmentId)
    ) {
      throw new Error("Equipment is not assigned.");
    }

    const equipmentIndex = this.equipmentList.findIndex(
      (equi) => equi.equipmentId === equipmentId
    );
    this.equipmentList.splice(equipmentIndex, 1);

    // handle event: equipmentReturned
  }
}
