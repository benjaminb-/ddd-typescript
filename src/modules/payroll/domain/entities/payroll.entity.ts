import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { Employee } from "./employee.entity";
import { Payslip } from "./payslip.entity";

interface PayrollProps {
  id: ID;
  period: Date;
  payslips: Array<Payslip>;
}

export class Payroll extends AggregateRoot<PayrollProps> {
  public static create(props: PayrollProps): Payroll {
    if (!props.period) {
      throw new Error("Fields are required");
    }

    return new Payroll(props);
  }

  public run(employees: Array<Employee>): Payroll {
    for (const employee of employees) {
      const id = ID.create();
      this.addPayslip(
        Payslip.create({
          id,
          employeeId: employee.id,
          period: this.props.period,
          salary: employee.currentRemuneration(this.props.period).value,
        })
      );
    }

    return this;
  }

  private addPayslip(payslip: Payslip): void {
    this.props.payslips.push(payslip);
  }
}
