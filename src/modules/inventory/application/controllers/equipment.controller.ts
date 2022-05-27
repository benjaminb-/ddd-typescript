import { Equipment } from "../../domain/entities/equipment.entity";
import {
  CreateEquipmentDto,
  RemoveEquipmentDto,
  UpdateEquipmentDto,
} from "../dtos/equipment.dto";
import { EquipmentService } from "../services/equipment.service";
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  public create(equipment: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.create(
      equipment.serialNumber,
      equipment.condition,
      equipment.equipmentType
    );
  }

  public updateCondition(equipment: UpdateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.updateCondition(
      equipment.condition,
      equipment.id
    );
  }

  public removeFromInventory(
    equipment: RemoveEquipmentDto
  ): Promise<Equipment> {
    return this.equipmentService.removeFromInventory(
      equipment.id,
      equipment.removedAt
    );
  }
}
