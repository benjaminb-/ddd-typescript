import { Employee } from "../domain/entities/employee.entity";
import { IEmployeeRepository } from "./../domain/repositories/employee.repository";

export class EmployeeRepository implements IEmployeeRepository {
  list(): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Employee> {
    throw new Error("Method not implemented.");
  }
  save(employee: Employee): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
