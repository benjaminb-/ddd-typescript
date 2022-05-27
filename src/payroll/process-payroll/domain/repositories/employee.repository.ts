import { IRepository } from "../../../../shared/domain/repository";
import { EmployeePayroll } from "../entities/employee.entity";

export interface IEmployeeRepository
  extends IRepository<EmployeePayroll, unknown> {
  updateSalary(id: string, salary: number): Promise<EmployeePayroll>;
  findById(id: string): Promise<EmployeePayroll>;
  save(employee: EmployeePayroll): Promise<EmployeePayroll>;
  getIdsAndSalary(): Promise<Array<EmployeePayroll>>;
}
