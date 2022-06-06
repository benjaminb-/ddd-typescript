import { Specification } from "../../../../shared/domain/specification";
import { Email } from "../value-objects/email.value-object";

export class EmployeeEmailTldAllowedSpecification implements Specification {
  constructor(private tld: string) {}

  // business rule to allow only email of a specific .tld
  public isSatisfiedBy(email: Email): boolean {
    const tld = email.value.split("@");
    return tld[1] === this.tld;
  }
}
