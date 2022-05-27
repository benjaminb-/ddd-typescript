import { IRepository } from "../../../../shared/domain/repository";
import { Employee } from "../entities/employee.entity";

export interface IEmployeeRepository extends IRepository<Employee, unknown> {
  list(): Promise<Array<Employee>>;
  findById(id: string): Promise<Employee>;
  isEmailExists(email: string): Promise<boolean>;
  save(employee: Employee): Promise<void>;
  remove(id: string): Promise<void>;
}
