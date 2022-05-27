import { IRepository } from "../../../../shared/domain/repository";
import { Equipment } from "../entities/equipment.entity";
export interface IEquipmentRepository extends IRepository<Equipment, unknown> {
  findById(id: string): Promise<Equipment>;
  save(equipment: Equipment): Promise<void>;
}
