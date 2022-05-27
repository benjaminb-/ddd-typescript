import { Condition, Equipment } from "../../domain/entities/equipment.entity";
import { IEquipmentRepository } from "../../domain/repositories/equipment.repository";

export class EquipmentService {
  constructor(private equipmentRepo: IEquipmentRepository) {}

  public async create(
    serialNumber: string,
    condition: Condition,
    equipmentType: string
  ): Promise<Equipment> {
    const equipment = Equipment.create({
      serialNumber: serialNumber,
      condition: condition,
      equipmentType: equipmentType,
    });

    await this.equipmentRepo.save(equipment);
    return equipment;
  }

  public async updateCondition(
    condition: Condition,
    id: string
  ): Promise<Equipment> {
    const equipment = await this.equipmentRepo.findById(id);

    equipment.updateCondition(condition);
    await this.equipmentRepo.save(equipment);

    // handle the event
    return equipment;
  }

  public async removeFromInventory(id: string, date: Date): Promise<Equipment> {
    const equipment = await this.equipmentRepo.findById(id);
    equipment.removeFromInventory(date);
    await this.equipmentRepo.save(equipment);
    // handle the event
    return equipment;
  }
}
