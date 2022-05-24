// DTO's can use class validator to perform payload validation

export class CreateEmployeeDto {
  public firstName: string;
  public lastName: string;
  public email: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

// email is removed from DTO we don't want to return the email, can be done with auto-mapper too
export class EmployeeDto {
  public id: string;
  public firstName: string;
  public lastName: string;
  public hasEnded: boolean;
}
