import { IEmployeeRepository } from "../../domain/repositories/employee.repository";
import { Email } from "../../domain/value-objects/email.value-object";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dtos/employee.dto";
import { Employee } from "./../../domain/entities/employee.entity";
import { EmployeeEmailTldAllowedSpecification } from "./../../domain/specifications/employee-email-tld-allowed.specification";
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
    await this.checkEmailExists(createEmployeeDto.email);

    const email = Email.create(createEmployeeDto.email);

    const specification = new EmployeeEmailTldAllowedSpecification("test.com");
    if (!specification.isSatisfiedBy(email)) {
      throw new Error(".tld not allowed");
    }

    const employee = Employee.create({
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
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(id);

    const email = Email.create(updateEmployeeDto.email);

    // this validation is not in the domain as this is an application purpose
    if (updateEmployeeDto.email !== employee.email) {
      await this.checkEmailExists(updateEmployeeDto.email);
      const specification = new EmployeeEmailTldAllowedSpecification(
        "test.com"
      );
      if (!specification.isSatisfiedBy(email)) {
        throw new Error(".tld not allowed");
      }
    }

    employee.updateProfile(
      updateEmployeeDto.firstName,
      updateEmployeeDto.lastName,
      email
    );

    await this.employeeRepository.save(employee);

    // custom event handler
    this.handleEvents(employee);

    return this.mapToDto(employee);
  }

  public async end(employeeId: string, endedAt: Date): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(employeeId);

    employee.end(endedAt);

    await this.employeeRepository.save(employee);

    this.handleEvents(employee);

    return this.mapToDto(employee);
  }

  public async restore(employeeId: string): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(employeeId);

    employee.restore();

    await this.employeeRepository.save(employee);

    // custom event handler
    this.handleEvents(employee);

    return this.mapToDto(employee);
  }

  // check email is not a specification has it is infrastructure related
  // specification are domain related
  private async checkEmailExists(email: string) {
    const emailExists = await this.employeeRepository.isEmailExists(email);
    if (emailExists) {
      throw new Error("Email already used");
    }
  }

  // this is a custom event handling implementation
  // in real world we use a local events library like https://github.com/EventEmitter2/EventEmitter2
  private handleEvents(employee: Employee): void {
    const events = employee.pullEvents();
    for (const event of events) {
      // check if there is any event handlers subscribed
      // trigger them to process..
    }
  }

  // We can use a library like auto-mapper to perform this
  private mapToDto(employee: Employee): EmployeeDto {
    return {
      id: employee.id as string,
      firstName: employee.firstName,
      lastName: employee.lastName,
      hasEnded: employee.hasEnded,
    };
  }
}
