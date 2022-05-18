import { ValueObject } from "../../../../shared/domain/value-object";

interface RemunerationProps {
  value: number;
  startedAt: Date;
}

export class Remuneration extends ValueObject<RemunerationProps> {
  public get value(): number {
    return this.props.value;
  }
}
