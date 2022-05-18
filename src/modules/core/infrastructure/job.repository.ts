import { Job } from "../domain/entities/job.entity";
import { IJobRepository } from "./../domain/repositories/job.repository";

export class JobRepository implements IJobRepository {
  list(): Promise<Job[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Job> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<Job> {
    throw new Error("Method not implemented.");
  }
  add(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(job: Job): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
