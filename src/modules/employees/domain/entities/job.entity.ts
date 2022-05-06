import { Entity } from "../../../../shared/domain/entity";
import { ID } from "../value-objects/id.value-object";

export interface JobProps {
  id: ID;
  name: string;
  level: number;
}

export class Job extends Entity<JobProps> {
  private constructor(props: JobProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get level(): number {
    return this.props.level;
  }

  public static create(props: JobProps): Job {
    if (!props.name || !props.level) {
      throw new Error("Job name and level are required");
    }

    return new Job(props);
  }
}
