import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";

export interface PayslipProps {
  id?: ID;
  employeeId: string;
  salary: number;
}

export class PayslipComputation extends AggregateRoot<PayslipProps> {
  public computationResult: { taxAmount: number; netSalary: number };

  private constructor(props: PayslipProps) {
    props.id = ID.create();
    super(props);
  }

  // here we expose only properties used outside with getters
  get id(): string | null {
    return this.props.id?.value || null;
  }

  public static create(
    payslipComputationInfo: PayslipProps
  ): PayslipComputation {
    const payslip = new PayslipComputation(payslipComputationInfo);
    // if (!props.id) {
    //   // trigger event if we create and no id, new employee
    //   payslip.addEvent(new PayslipCreated(payslip.props));
    // }
    payslip.calculate();
    return payslip;
  }

  private calculate() {
    const taxAmount = this.props.salary * 0.15;
    this.computationResult = {
      taxAmount,
      netSalary: this.props.salary - taxAmount,
    };
  }
}
