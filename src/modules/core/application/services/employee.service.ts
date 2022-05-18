import { ID } from "../../../../shared/domain/id.value-object";
import { Job } from "../../domain/entities/job.entity";
import { IEmployeeRepository } from "../../domain/repositories/employee.repository";
import { IJobRepository } from "../../domain/repositories/job.repository";
import { Email } from "../../domain/value-objects/email.value-object";
import { CreateEmployeeDto } from "../dtos/employee.dto";
import { Employee } from "./../../domain/entities/employee.entity";
import { EmployeeDto } from "./../dtos/employee.dto";

export class EmployeeService {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private jobRepository: IJobRepository
  ) {}

  public async list(): Promise<Array<EmployeeDto>> {
    const employees = await this.employeeRepository.list();
    return employees.map((e) => this.mapToDto(e));
  }

  public async create(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeDto> {
    const employeeId = ID.create();
    const email = Email.create(createEmployeeDto.email) as Email;

    const jobExists = await this.jobRepository.findByName(
      createEmployeeDto.jobTitle
    );

    const job =
      jobExists ??
      Job.create({
        id: ID.create(),
        name: createEmployeeDto.jobTitle,
        level: 10,
        employeeIds: [],
      });

    job.addEmployeeId(employeeId);

    await this.jobRepository.save(job);

    const employee = Employee.create({
      id: employeeId,
      email,
      firstName: createEmployeeDto.firstName,
      lastName: createEmployeeDto.lastName,
      job,
    });

    // TODO events

    await this.employeeRepository.save(employee);

    return this.mapToDto(employee);
  }

  public async update(
    id: string,
    employee: CreateEmployeeDto
  ): Promise<EmployeeDto> {
    return {} as any; // FIXME
  }

  private mapToDto(employee: Employee): EmployeeDto {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      jobTitle: employee.job.name,
    };
  }
}
