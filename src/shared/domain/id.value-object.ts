import { ValueObject } from "./value-object";

interface IDProps {
  value: string;
}

export class ID extends ValueObject<IDProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IDProps) {
    super(props);
  }

  public static create(): ID {
    return new ID({ value: "randstring" });
  }
}
