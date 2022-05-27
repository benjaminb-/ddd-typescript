import { Condition } from "../../domain/entities/equipment.entity";
// DTO's can use class validator to perform payload validation

export class CreateEquipmentDto {
  public serialNumber: string;
  public condition: Condition;
  public equipmentType: string;
}

export class UpdateEquipmentDto {
  public id: string;
  public condition: Condition;
}

export class RemoveEquipmentDto {
  public id: string;
  public removedAt: Date;
}

export class EquipmentDto {
  public id: string;
  public serialNumber: string;
  public condition: Condition;
  public equipmentType: string;
  public removedAt?: Date;
}
