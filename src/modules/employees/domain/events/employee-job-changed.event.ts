import { DomainEvent } from "../../../../shared/domain/domain.event";
import { Job } from "../entities/job.entity";

export class EmployeeJobChanged extends DomainEvent {
  constructor(previousJob: Job) {
    super();
  }
}
