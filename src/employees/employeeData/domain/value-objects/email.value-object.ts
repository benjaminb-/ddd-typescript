import { ValueObject } from "../../../../shared/domain/value-object";
import { EmployeeEmailTldAllowedSpecification } from "../specifications/employee-email-tld-allowed.specification";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Email {
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Email format is invalid");
    }

    const emailVo = new Email({ value: email });

    const specification = new EmployeeEmailTldAllowedSpecification("test.com");
    if (!specification.isSatisfiedBy(emailVo)) {
      throw new Error(".tld not allowed");
    }

    return emailVo;
  }
}
