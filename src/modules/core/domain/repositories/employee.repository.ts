import { Employee } from "./../entities/employee.entity";

export interface IEmployeeRepository {
  list(): Promise<Array<Employee>>;
  findById(): Promise<Employee>;
  save(employee: Employee): Promise<void>;
  remove(): Promise<void>;
}
