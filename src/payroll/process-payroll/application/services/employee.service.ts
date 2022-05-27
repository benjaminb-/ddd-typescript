import { IEmployeeRepository } from "../../domain/repositories/employee.repository";

export class EmployeeService {
  constructor(private employeeRepository: IEmployeeRepository) {}

  public async updateSalary(id: string, salary: number) {
    const employee = await this.employeeRepository.findById(id);

    employee.updateMonthlySalary(salary);

    await this.employeeRepository.save(employee);

    //   HANDLE EVENT

    // RETURN MAP TO DTO ?
  }
}
