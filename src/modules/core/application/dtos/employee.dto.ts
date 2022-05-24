export class CreateEmployeeDto {
  public email: string;
  public firstName: string;
  public lastName: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class EmployeeDto extends CreateEmployeeDto {
  id: string;
}
