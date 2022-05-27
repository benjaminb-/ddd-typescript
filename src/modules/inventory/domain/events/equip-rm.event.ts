import { DomainEvent } from "../../../../shared/domain/domain.event";
import { EquipmentProps } from "../entities/equipment.entity";

export class EquipmentRmFromInventory extends DomainEvent {
  constructor(equipment: EquipmentProps) {
    super();
  }
}
