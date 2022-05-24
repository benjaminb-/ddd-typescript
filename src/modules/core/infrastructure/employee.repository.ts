import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ID } from "../../../shared/domain/id.value-object";
import { Employee } from "../domain/entities/employee.entity";
import { Email } from "../domain/value-objects/email.value-object";
import { IEmployeeRepository } from "./../domain/repositories/employee.repository";

// this is just an exemple of a mongodb model/schema or typegoose model
export class MongoEmployeeModel {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  employment: {
    hasEnded: boolean;
    date?: Date;
  };
}

export class EmployeeRepository implements IEmployeeRepository {
  mapToDomain(doc: MongoEmployeeModel): Employee {
    return Employee.create({
      id: ID.create(doc._id?.toString()),
      firstName: doc.firstName,
      lastName: doc.firstName,
      email: Email.create(doc.email),
      hasEnded: doc.employment.hasEnded,
      endedAt: doc.employment.date,
    });
  }

  mapToInfra(entity: Employee): MongoEmployeeModel {
    return {
      _id: new ObjectId(entity.id),
      firstName: entity.firstName,
      lastName: entity.firstName,
      email: entity.email,
      employment: {
        hasEnded: entity.hasEnded,
        date: entity.endedAt,
      },
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
