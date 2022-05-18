import { Entity } from "../../../../shared/domain/entity";
import { ID } from "../../../../shared/domain/id.value-object";
import { TaxCalculatorService } from "../services/tax-calculator.service";

interface PayslipProps {
  id: ID;
  period: Date;
  employeeId: string;
  salary: number;
  totalTax?: number;
}

export class Payslip extends Entity<PayslipProps> {
  public static create(props: PayslipProps): Payslip {
    if (!props.period || !props.employeeId || props.salary) {
      throw new Error("Fields are required");
    }

    const taxCalculator = new TaxCalculatorService();
    props.totalTax = taxCalculator.compute(props.salary);

    // if this part start to be complicated we can use a separated factory
    // or use builder design pattern

    return new Payslip(props);
  }
}
