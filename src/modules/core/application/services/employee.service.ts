import { ID } from "../../../../shared/domain/id.value-object";
import { IEmployeeRepository } from "../../domain/repositories/employee.repository";
import { EmployeeEmailExistsSpecification } from "../../domain/specifications/employee-email-exists.specification";
import { Email } from "../../domain/value-objects/email.value-object";
import { CreateEmployeeDto } from "../dtos/employee.dto";
import { Employee } from "./../../domain/entities/employee.entity";
import { EmployeeDto } from "./../dtos/employee.dto";

export class EmployeeService {
  constructor(private employeeRepository: IEmployeeRepository) {}

  public async list(): Promise<Array<EmployeeDto>> {
    const employees = await this.employeeRepository.list();
    return employees.map((e) => this.mapToDto(e));
  }

  public async create(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeDto> {
    const employeeId = ID.create();
    const email = Email.create(createEmployeeDto.email);

    const employee = Employee.create({
      id: employeeId,
      email,
      firstName: createEmployeeDto.firstName,
      lastName: createEmployeeDto.lastName,
    });

    await this.employeeRepository.save(employee);

    this.handleEvents(employee);

    return this.mapToDto(employee);
  }

  public async update(
    id: string,
    employeeDto: CreateEmployeeDto
  ): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(id);

    if (employeeDto.email !== employee.email) {
      const otherEmails: Array<Email> = [];
      if (
        new EmployeeEmailExistsSpecification(
          Email.create(employee.email)
        ).isSatisfiedBy(otherEmails)
      ) {
        throw new Error("Email already used");
      }
    }

    employee.updateInformation(
      employeeDto.firstName,
      employeeDto.lastName,
      employeeDto.email
    );

    await this.employeeRepository.save(employee);

    this.handleEvents(employee);

    return this.mapToDto(employee);
  }

  private handleEvents(employee: Employee): void {
    const events = employee.pullEvents();
    for (const event of events) {
      // here we trigger the events
      event.handle();
    }
  }

  private mapToDto(employee: Employee): EmployeeDto {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    };
  }
}
