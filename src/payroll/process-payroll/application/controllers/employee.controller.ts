// API validation is done at controller level with DTO's

import { EmployeeService } from "../services/employee.service";

export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  public updateMonthlySalary(id: string, salary: number): Promise<void> {
    return this.employeeService.updateSalary(id, salary);
  }
}
