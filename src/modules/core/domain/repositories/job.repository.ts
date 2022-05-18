import { Job } from "../entities/job.entity";

export interface IJobRepository {
  list(): Promise<Array<Job>>;
  findById(): Promise<Job>;
  findByName(name: string): Promise<Job>;
  add(): Promise<void>;
  save(job: Job): Promise<void>;
  remove(): Promise<void>;
}
