import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../value-objects/id.value-object";

export interface JobProps {
  id: ID;
  name: string;
  level: number;
  employeeIds: Array<ID>;
}

export class Job extends AggregateRoot<JobProps> {
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

  public delete(job: Job) {
    if (job.props.employeeIds.length > 0) {
      throw new Error("Cannot delete job used by employees");
    }
  }

  public addEmployeeId(id: ID): void {
    this.props.employeeIds.push(id);
  }
}
