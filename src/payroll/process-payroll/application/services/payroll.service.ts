import { MonthlyPayroll } from "../../domain/entities/monthlyPayroll.entity";
import { IEmployeeRepository } from "../../domain/repositories/employee.repository";
import { IMonthlyPayrollRepository } from "../../domain/repositories/payroll.repository";

export class PayrollService {
  constructor(
    private payrollRepository: IMonthlyPayrollRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  public async generateMonthlyPayroll(periodAt: Date) {
    const employees = await this.employeeRepository.getIdsAndSalary();

    const monthlyPayroll = MonthlyPayroll.create({ periodAt });
    monthlyPayroll.generateMonthlyPayroll(
      employees.map((emp) => ({
        employeeId: emp.id,
        salary: emp.monthlySalary,
      }))
    );

    await this.payrollRepository.saveMonhtlyPayroll(monthlyPayroll);

    //   HANDLE EVENT ??

    // RETURN MAP TO DTO ?
  }
}
