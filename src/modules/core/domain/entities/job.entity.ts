import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";

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

  get id(): string {
    return this.props.id.value;
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
    if (this.props.employeeIds.map((e) => e.value).includes(id.value)) {
      throw new Error("Employee already assigned to this job");
    }

    this.props.employeeIds.push(id);
  }
}
