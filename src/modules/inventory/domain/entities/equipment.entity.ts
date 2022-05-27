import { AggregateRoot } from "../../../../shared/domain/aggregate-root";
import { ID } from "../../../../shared/domain/id.value-object";
import { EquipmentConditionWorsen } from "../events/equip-condition.event";
import { EquipmentRmFromInventory } from "../events/equip-rm.event";

export type Condition = "good" | "bad";

export interface EquipmentProps {
  id?: ID;
  serialNumber: string;
  equipmentType: string;
  condition: Condition;
  removedAt?: Date;
}

export class Equipment extends AggregateRoot<EquipmentProps> {
  get id(): string | null {
    return this.props.id?.value || null;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  get equipmentType(): string {
    return this.props.equipmentType;
  }

  get condition(): Condition {
    return this.props.condition;
  }

  get removedAt(): Date | null {
    return this.props.removedAt || null;
  }

  public static create(props: EquipmentProps): Equipment {
    props.id = ID.create();
    return new Equipment(props);
  }

  public updateCondition(condition: Condition): Equipment {
    this.props.condition = condition;
    if (condition === "bad") {
      this.addEvent(new EquipmentConditionWorsen(this.props));
    }
    return this;
  }

  public removeFromInventory(date: Date): Equipment {
    if (this.props.removedAt) {
      throw new Error("eq already rm");
    }

    this.props.removedAt = date;

    this.addEvent(new EquipmentRmFromInventory(this.props));

    return this;
  }
}
