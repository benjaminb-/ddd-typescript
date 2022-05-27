import { ValueObject } from "../../../../shared/domain/value-object";

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

    return new Email({ value: email });
  }
}
