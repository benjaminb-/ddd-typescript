import { IRepository } from "../../../../shared/domain/repository";
import { MonthlyPayroll } from "../entities/monthlyPayroll.entity";

export interface IMonthlyPayrollRepository
  extends IRepository<MonthlyPayroll, unknown> {
  saveMonhtlyPayroll(monthlyPayroll: MonthlyPayroll): Promise<MonthlyPayroll>;
}
