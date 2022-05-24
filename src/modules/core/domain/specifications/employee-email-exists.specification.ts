import { Specification } from "../../../../shared/domain/specification";
import { Email } from "../value-objects/email.value-object";

export class EmployeeEmailExistsSpecification implements Specification {
  constructor(private email: Email) {}

  public isSatisfiedBy(emails: Array<Email>): boolean {
    return emails.some((e) => e.isSameAs(this.email));
  }
}
