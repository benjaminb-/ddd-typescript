import {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from "../dtos/employee.dto";
import { EmployeeService } from "../services/employee.service";

export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  public list(employee: CreateEmployeeDto): Promise<Array<EmployeeDto>> {
    return this.employeeService.list();
  }

  public create(employee: CreateEmployeeDto): Promise<EmployeeDto> {
    return this.employeeService.create(employee);
  }

  public update(id: string, employee: UpdateEmployeeDto): Promise<EmployeeDto> {
    return this.employeeService.update(id, employee);
  }
}
