export class CreateEmployeeDto {
  public email: string;
  public firstName: string;
  public lastName: string;
  public jobTitle: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class EmployeeDto extends CreateEmployeeDto {
  id: string;
}
