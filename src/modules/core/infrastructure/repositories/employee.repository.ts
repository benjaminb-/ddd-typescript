import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ID } from "../../../../shared/domain/id.value-object";
import {
  Employee,
  EquipmentAssignment,
} from "../../domain/entities/employee.entity";
import { IEmployeeRepository } from "../../domain/repositories/employee.repository";
import { Email } from "../../domain/value-objects/email.value-object";

// this is just an exemple of a mongodb model/schema or typegoose model
// this repository implementation and model has been done after all the domain + application layer code
// we can easily switch DB system, or totally avoid and think about DB during dev.
export class MongoEmployeeModel {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  employment: {
    endDate?: Date | null;
  };
  equipmentList: Array<EquipmentAssignment>;
}

export class EmployeeRepository implements IEmployeeRepository {
  mapToDomain(doc: MongoEmployeeModel): Employee {
    return Employee.create({
      id: ID.create(doc._id?.toString()),
      firstName: doc.firstName,
      lastName: doc.firstName,
      email: Email.create(doc.email),
      endedAt: doc.employment?.endDate,
      // TODO: map requipmentList here
    });
  }

  mapToInfra(entity: Employee): MongoEmployeeModel {
    return {
      _id: new ObjectId(entity.id as string),
      firstName: entity.firstName,
      lastName: entity.firstName,
      email: entity.email,
      employment: {
        endDate: entity.endedAt,
      },
      equipmentList: entity.listOfEquipments,
    };
  }

  async list(): Promise<Employee[]> {
    const documents = await mongoose.model("employee").find({}).lean().exec();
    return documents.map((document) => this.mapToDomain(document as any));
  }

  async findById(id: string): Promise<Employee> {
    const document = await mongoose
      .model("employee")
      .findOne({ _id: new ObjectId(id) })
      .lean()
      .exec();
    return this.mapToDomain(document as any);
  }

  async isEmailExists(email: string): Promise<boolean> {
    const exists = await mongoose
      .model("employee")
      .findOne({ email })
      .lean()
      .exec();

    return !!exists;
  }

  async save(employee: Employee): Promise<void> {
    const document = this.mapToInfra(employee);
    await mongoose
      .model("employee")
      .findByIdAndUpdate(document._id, employee)
      .exec();
  }

  async remove(id: string): Promise<void> {
    await mongoose
      .model("employee")
      .deleteOne({ _id: new ObjectId(id) })
      .exec();
  }
}
