import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ID } from "../../../../shared/domain/id.value-object";
import { Condition, Equipment } from "../../domain/entities/equipment.entity";
import { IEquipmentRepository } from "../../domain/repositories/equipment.repository";

export class MongoEquipmentModel {
  _id: ObjectId;
  condition: Condition;
  equipmentType: string;
  serialNumber: string;
  removedAt?: Date;
}

export class EquipmentRepository implements IEquipmentRepository {
  async findById(id: string): Promise<Equipment> {
    const document = await mongoose
      .model("equipment")
      .findOne({ _id: new ObjectId(id) })
      .lean()
      .exec();
    return this.mapToDomain(document as any);
  }
  mapToDomain(doc: MongoEquipmentModel): Equipment {
    return Equipment.create({
      id: ID.create(doc._id?.toString()),
      condition: doc.condition,
      equipmentType: doc.equipmentType,
      serialNumber: doc.serialNumber,
      removedAt: doc.removedAt,
    });
  }

  mapToInfra(entity: Equipment): MongoEquipmentModel {
    return {
      _id: new ObjectId(entity.id as string),
      condition: entity.condition,
      equipmentType: entity.equipmentType,
      serialNumber: entity.serialNumber,
      removedAt: entity.removedAt as Date,
    };
  }
  async save(equipment: Equipment): Promise<void> {
    const document = this.mapToInfra(equipment);
    await mongoose
      .model("equipment")
      .findByIdAndUpdate(document._id, equipment)
      .exec();
  }
}
