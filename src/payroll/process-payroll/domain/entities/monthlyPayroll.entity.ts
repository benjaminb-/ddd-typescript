import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { PayslipComputation, PayslipProps } from "./payslip.entity";

export interface MonthlyPayrollProps {
  id?: ID;
  periodAt: Date;
}

export class MonthlyPayroll extends AggregateRoot<MonthlyPayrollProps> {
  private payslips: Array<PayslipComputation>;
  private _totalPayout: number;

  private constructor(props: MonthlyPayrollProps) {
    props.id = ID.create();
    super(props);
  }

  public get totalPayout() {
    return this._totalPayout;
  }

  public static create(payload: MonthlyPayrollProps) {
    return new MonthlyPayroll(payload);
  }

  // Warning: Should not have the behavior to update salary
  public generateMonthlyPayroll(payslips: Array<PayslipProps>) {
    this.payslips = payslips.map((payslip) => {
      return PayslipComputation.create(payslip);
    });

    this._totalPayout = this.payslips.reduce(
      (acc, payslip) => acc + payslip.computationResult.netSalary,
      0
    );

    return this;
  }
}
